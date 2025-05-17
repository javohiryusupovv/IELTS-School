

//rang generator hash code bilan random bulib beriladi render bulganda uzgarmayudi



export const getStableColor = (_id: string) => {
  const colours = [
    "#c38cee",
    "#9ad3bc",
    "#8bcdcd",
    "#ee7093",
    "#65ddae",
    "#67db73"
  ]
  if (!_id) return colours[0];

  const hash = _id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return colours[hash % colours.length];  // Sof HEX rangni qaytaramiz
};



export const reasonsWithValues = {
  UygaVazifa: 10,
  VaqtidaKeldi: 15,
  ImtihondanYaxshiBall: 0
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}.${month}.${year}`;
};

export const formatReasonText = (str: string) => {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};



export const lastPaymentDate = new Date('2025-04-20'); // statik to‘lov sanasi
export const formatDateFromDMY = (dateStr: string) => {
  if (!dateStr) return "Sana yo'q";
  const [day, month, year] = dateStr.split('.');
  const date = new Date(+year, +month - 1, +day);
  return date.toLocaleDateString(); // bu yerda brauzer tiliga mos formatda chiqaradi
};

