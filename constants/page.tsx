import macbookm3 from "../public/img/macbook.webp"
import Macos from "../public/img/macos.jpg"
import keyboard from "../public/img/keyboard.jpg";
import magic from "../public/img/magic.jpg";
import minimac from "../public/img/macmini.jpg"
import Airpods from "../public/img/aipods.jpg";

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
    homework: 10,
    keldi: 10,
    leader: 15
  };
  
 export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}.${month}.${year}`;
};