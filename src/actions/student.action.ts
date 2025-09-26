"use server";

import ConnectMonogDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { unstable_cache } from "next/cache";
import { revalidatePath, revalidateTag } from "next/cache";
import moment from "moment";

import { Course, Student, Teacher, Shop } from "@/models/index"
import Education from "@/models/courseBox.model";
import bcrypt from "bcryptjs";


type Records_Coins = {
  reason: string;
  value: number;
}[];


// Muayyan talabani olish (kesh bilan)
export const getStudentById = unstable_cache(
  async (studentId: string) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        throw new Error("Noto‘g‘ri ID!");
      }
      await ConnectMonogDB();
      const student = await Student.findById(studentId)
        .populate({
          path: "course",
          model: Course,
          select: "courseTitle", // Faqat kerakli maydon
        })
        .lean(); // Performansi oshirish uchun
      if (!student) {
        throw new Error("Talaba topilmadi!");
      }
      return JSON.parse(JSON.stringify(student));
    } catch (error) {
      console.error(`Error fetching student ${studentId}:`, error);
      throw new Error("Talabani olishda xatolik yuz berdi");
    }
  },
  ["student"], // Statik kesh kaliti
  { revalidate: 300, tags: ["student"] } // Umumiy "student" tegi
);

// Yangi talaba qo‘shish
export const postAddStudent = async (
  courseId: string,
  name: string,
  surname: string,
  password: string,
  phone: string,
  studentID: string,
  path: string
) => {
  if (!name || !surname || !password || !phone || !courseId || !studentID) {
    throw new Error("Barcha maydonlarni to‘ldirish shart!");
  }

  try {
    await ConnectMonogDB();
    const existingStudent = await Student.findOne({ $or: [{ phone }, { studentID }] });
    if (existingStudent) {
      throw new Error("Bu telefon raqam yoki student ID allaqachon mavjud!");
    }

    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Kurs topilmadi!");
    }

    // Parolni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10); // 10 — bu saltRounds

    const newStudent = new Student({
      name,
      surname,
      phone,
      password: hashedPassword,
      studentID,
      course: courseId,
      publishStudent: true,
      balance: -course.price,
    });
    await newStudent.save();

    course.students.unshift(newStudent._id);
    await course.save();
    if (course.educationCenter) {
      await Education.findByIdAndUpdate(course.educationCenter, {
        $push: { students: newStudent._id },
      });
    }
    // Keshni yangilash
    revalidateTag("students");
    revalidateTag("student");
    revalidatePath(path);
    return { success: true, message: "Talaba muvaffaqiyatli qo‘shildi!" };
  } catch (error) {
    console.error("Error adding student:", error);
    throw new Error("Talaba qo‘shishda xatolik yuz berdi");
  }
};

// Talabani o‘chirish
export const deleteStudent = async (
  studentId: string,
  courseId: string,
  path: string
) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(studentId) ||
      !mongoose.Types.ObjectId.isValid(courseId)
    ) {
      throw new Error("Noto‘g‘ri ID!");
    }
    await ConnectMonogDB();
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: new mongoose.Types.ObjectId(studentId) } },
      { new: true }
    );
    if (!updatedCourse) {
      throw new Error("Kurs topilmadi yoki talaba o‘chirilmadi!");
    }
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      throw new Error("Talaba topilmadi yoki o‘chirilmadi!");
    }

    // Keshni yangilash
    revalidateTag("students");
    revalidateTag("student");
    revalidatePath(path);
    return { success: true, message: "Talaba muvaffaqiyatli o‘chirildi!" };
  } catch (error) {
    console.error(`Talabani o‘chirishda xatolik:`, error);
    throw new Error("Talabani o‘chirishda xatolik yuz berdi");
  }
};

// Talaba statusini yangilash
export const ActiveStudent = async (
  id: string,
  status: boolean,
  path: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Noto'g'ri ID!");
    }
    await ConnectMonogDB();
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      { publishStudent: status },
      { new: true }
    );
    if (!updatedStudent) {
      throw new Error("Talaba topilmadi!");
    }

    // Keshni yangilash
    revalidateTag("students");
    revalidateTag("student");
    revalidatePath(path);
    return { success: true, message: "Talaba statusi yangilandi!" };
  } catch (error) {
    console.error(`Error updating student status ${id}:`, error);
    throw new Error("Talaba statusini yangilashda xatolik yuz berdi");
  }
};

// Talaba ma‘lumotlarini yangilash
export const updateStudent = async (
  studentId: string,
  data: { name: string; surname: string; phone: string, password: string, course: string },
  path: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Noto'g'ri ID!");
    }
    if (!data.name || !data.surname || !data.phone) {
      throw new Error("Barcha maydonlarni to‘ldirish shart!");
    }
    await ConnectMonogDB();

    const student = await Student.findById(studentId).populate("course");
    if (!student) {
      throw new Error("Talaba topilmadi!");
    }
    const oldCourseId = student.course?._id;

    if (oldCourseId && oldCourseId.toString() !== data.course) {
      await Course.findByIdAndUpdate(oldCourseId, {
        $pull: { students: student._id },
      });
    }

    // 3. Yangi kursga talabaning ID sini qo‘shamiz
    if (data.course && oldCourseId?.toString() !== data.course) {
      await Course.findByIdAndUpdate(data.course, {
        $addToSet: { students: student._id },
      });
    }

    const updatedFieldStudent: any = {
      name: data.name,
      surname: data.surname,
      phone: data.phone,
      course: data.course
    }

    if (data.password) {
      const hashPassword = await bcrypt.hash(data.password, 10);
      updatedFieldStudent.password = hashPassword;
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedFieldStudent,
      { new: true }
    );
    if (!updatedStudent) {
      throw new Error("Talaba topilmadi!");
    }

    // Keshni yangilash
    revalidateTag("students");
    revalidateTag("student");
    revalidatePath(path);
    return JSON.parse(JSON.stringify(updatedStudent));
  } catch (error) {
    console.error(`Error updating student ${studentId}:`, error);
    throw new Error("Talaba ma'lumotlarini yangilashda xatolik yuz berdi");
  }
};

interface IAttendance {
  date: string; // YYYY-MM-DD
  status: "keldi" | "kelmadi" | "bosh";
  updatedAt: Date;
}

// Talabaga coin qo‘shish
export const addAttendance = async (
  studentId: string,
  date: string,
  status: "keldi" | "kelmadi" | "bosh",
  path: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Noto'g'ri ID!");
    }

    await ConnectMonogDB();

    const student = await Student.findById(studentId);
    if (!student) throw new Error("Talaba topilmadi!");

    const givenDate = moment(date).format("YYYY-MM-DD");

    // Shu kunga oid yozuvni topamiz
    const existing = student.attendance.find((a: IAttendance) => a.date === givenDate);

    if (existing) {
      // 24 soat o‘tmagan bo‘lsa o‘zgartirish mumkin
      const diffHours = moment().diff(moment(existing.updatedAt), "hours");
      if (diffHours < 24) {
        existing.status = status;
        existing.updatedAt = new Date();
      } else {
        throw new Error("24 soatdan keyin o'zgartirish mumkin emas!");
      }
    } else {
      // Yangi yozuv qo‘shamiz
      student.attendance.push({
        date: givenDate,
        status,
        updatedAt: new Date(),
      });
    }

    await student.save();

    revalidateTag("students");
    revalidateTag("student");
    revalidatePath(path);

    return { success: true, message: "Davomat yangilandi!" };
  } catch (error) {
    console.error("Davomat qo'shishda xatolik:", error);
    throw new Error("Davomat qo'shishda xatolik yuz berdi");
  }
};


// Talabadan coin ayirish
export const salesUpdateCoins = async (
  studentId: string,
  coinValue: number,
  productid: string,
  path: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new Error("Noto'g'ri ID!");
    }
    if (coinValue <= 0) {
      throw new Error("Coin qiymati musbat bo'lishi kerak!");
    }
    await ConnectMonogDB();
    const student = await Student.findById(studentId);
    const product = await Shop.findById(productid)

    if (!student) throw new Error("Talaba topilmadi!");
    if (!product) throw new Error("Mahsulot topilmadi!");

    if (product.remainingQuantity <= 0) {
      throw new Error("Mahsulot qolmagan!");
    }

    const today = moment().format("YYYY-MM-DD");
    student.coins.push({
      value: -coinValue,
      date: today,
      reasons: [{ reason: "Coin almashtirildi !", value: -coinValue }],
    });
    await student.save();

    product.remainingQuantity -= 1

    await product.save()

    // Keshni yangilash
    revalidateTag("students");
    revalidateTag("student");
    revalidateTag("products");
    revalidatePath(path);
    return { success: true, message: "Coin muvaffaqiyatli ayirildi!" };
  } catch (error) {
    console.error(`Error subtracting coins from student ${studentId}:`, error);
    throw new Error("Coin ayirishda xatolik yuz berdi");
  }
};

export const addAdminCoins = async (
  studentID: string,
  reason: string,
  value: number,
  path: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(studentID)) {
      throw new Error("Noto'g'ri ID!");
    }
    const givenDate = moment().format("YYYY-MM-DD");

    await ConnectMonogDB();
    const student = await Student.findById(studentID);
    if (!student) {
      throw new Error("Talaba topilmadi!");
    }

    const formattedValue = Number(value);

    if (formattedValue === 0) {
      throw new Error("Coin soni 0 bo'lishi mumkin emas!");
    }

    student.coins.push({
      value: formattedValue,
      date: givenDate,
      reasons: [{ reason, value: formattedValue }],
    });

    student.lastDateCoin = new Date(givenDate);
    await student.save();
    revalidateTag("students");
    revalidateTag("student");
    revalidatePath(path);
  } catch (error) {
    throw new Error("Coin Admin qo'shishda Xatolik");
  }
};

export const addTeacherBonusCoin = async (
  studentID: string,
  coin: number,
  reason: string,   // qo‘shildi
  path: string
) => {
  try {
    await ConnectMonogDB();
    const nowDate = moment().format("YYYY-MM-DD");
    const student = await Student.findById(studentID);
    if (!student) {
      throw new Error("Talaba topilmadi!");
    }

    student.coins.push({
      value: coin,
      date: nowDate,
      reasons: [{ reason, value: coin }],  // dynamic reason
    });

    await student.save();
    revalidatePath(path);
    revalidateTag("students");
    revalidateTag("student");
  } catch (error) {
    throw new Error("Xatolik yuz berdi Coin qo'shishda: " + error);
  }
};


export async function deleteCoinHistoryEntry(
  studentId: string,
  coinId: string,
  pathname: string
) {
  try {
    await Student.findByIdAndUpdate(studentId, {
      $pull: {
        coins: { _id: coinId },
      },
    });

    revalidatePath(pathname);
    return { success: true };
  } catch (error) {
    console.error("Coin history entry delete error:", error);
    throw new Error("Coin tarixini o‘chirishda xatolik yuz berdi");
  }
}



export const addPayment = async (
  studentId: string,
  paymentData: { amount: number; type: "Naqd" | "Karta" | "Click" },
  path: string
) => {
  try {
    await ConnectMonogDB();
    const student = await Student.findById(studentId).populate("course");
    if (!student) throw new Error("Talaba topilmadi!");

    const coursePrice = student.course?.price || 0;
    console.log(coursePrice);


    const today = new Date();

    // 🔹 Talaba qo'shilgan sana
    const startDate = student.createdAt || today;

    // 🔹 Agar oldingi to‘lov bo‘lsa, oxirgi nextPayment asosida hisoblaymiz
    const lastPayment = student.payments?.length
      ? student.payments[student.payments.length - 1].nextPayment
      : null;

    let nextPayment: Date;
    if (lastPayment) {
      // Oxirgi nextPayment dan keyingi oyga o‘tkazamiz
      nextPayment = new Date(lastPayment);
      nextPayment.setMonth(nextPayment.getMonth() + 1);
    } else {
      // Birinchi marta to‘lov qilsa → student qo‘shilgan sanadan 1 oy qo‘shamiz
      nextPayment = new Date(startDate);
      nextPayment.setMonth(nextPayment.getMonth() + 1);
    }

    // 🔹 yangi to‘lovni qo‘shamiz
    const newPayment = {
      amount: paymentData.amount,
      type: paymentData.type,
      date: today,
      nextPayment,
      status:
        paymentData.amount + student.balance >= 0 ? "to'langan" : "qarzdor",
    };

    student.payments.push(newPayment);

    // 🔹 balansni yangilash
    student.balance += paymentData.amount;

    await student.save();

    revalidateTag("students");
    revalidateTag("student");
    revalidatePath(path);

    return { success: true, message: "To‘lov muvaffaqiyatli qo‘shildi!" };
  } catch (error) {
    console.error("Error adding payment:", error);
    throw new Error("To‘lov qo‘shishda xatolik yuz berdi");
  }
};
