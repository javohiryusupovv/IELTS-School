
export interface IPayment {
  amount: number;
  type: "Naqd" | "Karta";
  date: string;        // MongoDB ISO date bo‘ladi
  nextPayment: string; // ISO date
  status: string;
}

export interface IStudent {
  publishStudent: boolean;
  _id: string;
  studentID: string;
  name: string;
  surname: string;
  password: string,
  phone: string;
  parentPhone: string;
  coins: number[];
  payments: IPayment[];
  course: ICourse; // MongoDB ObjectId string sifatida bo'ladi
  balance: number;
  birthday: Date | null;
  createdAt: string;
  paymentNext: string;
}

export interface ICourse {
  _id: string;
  courseTitle: string;
  teacher: string | ITeacher;
  startDate: string;
  endDate: string;
  days: string[];
  price: number,
  educationCenter: string;
}

export interface ITeacher {
  _id: string; // MongoDB ObjectId string sifatida bo'ladi
  teacherName: string;
  teacherSurname: string;
  teacherPhone?: string;
  teacherPassword?: string;
  role?: string;
  courses: ICourse[]; // Kurslar ID-lari bo'lishi mumkin
}

export interface ICreateShop {
  _id?: string;
  title?: string;
  description?: string;
  price: number;
  image: string;
  totalQuantity: number, 
  remainingQuantity: number,
  educationID: string;
}

export interface Records_Coins{
  homework?: boolean,
  onTime?: boolean,
  highScore?: boolean
}