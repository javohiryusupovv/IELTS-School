


export interface IStudent {
  publishStudent: boolean;
  _id: string;
  studentID: string;
  name: string;
  surname: string;
  phone: string;
  coins: number[];
  course: ICourse; // MongoDB ObjectId string sifatida bo'ladi
}

export interface ICourse {
  _id: string;
  courseTitle: string;
  teacher: string | ITeacher;
  startDate: string;
  endDate: string;
  days: string[];
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
  title: string;
  description: string;
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