import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Typeni siz allaqachon quyidagicha aniqlagansiz
type ChartData = {
  name: string;
  surname: string;
  coins: number;
  course: string;
};

// Funksiya: data ni parametr qilib berish
export const downloadExcel = (data: ChartData[]) => {
  const worksheetData = data.map((item: ChartData) => ({
    "Ism va Familiya": `${item.surname} ${item.name}`,
    "Kurs": item.course,
    "Coinlar soni": `${item.coins} coin`,
  }));

  const worksheet = XLSX.utils.json_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Bugungi Coinlar");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });

  saveAs(fileData, "bugungi-coinlar.xlsx");
};
