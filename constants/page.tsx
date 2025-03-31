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
  

  export const getProducts = async() => [
    {
        id: 1,
        image: macbookm3,
        title: "Macbook Air 2",
        description: "Yangi M3 chipli MacBook Air noutbuki sizga yuqori unumdorlik va qulaylikni taqdim etadi. Engil va ixcham dizayni bilan har qanday joyda ishlash imkonini beradi. Retina displeyi yorqin va tiniq tasvirni taqdim etib, uzoq muddatli ishlash uchun ideal tanlovdir.",
        coin: 200,
        qolganproduct: 10,
        levelRequired: 2
    },
    {
        id: 2,
        image: Macos,
        title: "Macbook Monitor",
        description: "MacBook uchun mo‘ljallangan yuqori sifatli monitor. Yorqin va aniq tasvir, keng rang diapazoni va minimal dizayn bilan ajralib turadi. Ish yoki ijodiy loyihalar uchun ajoyib tanlov. Ko‘zlarni charchatmaydigan texnologiyalar bilan jihozlangan.",
        coin: 500,
        qolganproduct: 4,
        levelRequired: 2
    },
    {
        id: 3,
        image: keyboard,
        title: "Macbook Keyboard",
        description: "MacBook uchun maxsus ishlab chiqilgan yangi klaviatura. Yumshoq va jim bosiladigan tugmalar bilan ishlash qulayligi oshirilgan. Yorug‘lik sensorlari bilan jihozlangan bo‘lib, har qanday sharoitda qulay foydalanish imkonini beradi.",
        coin: 50,
        qolganproduct: 30,
        levelRequired: 3
    },
    {
        id: 4,
        image: magic,
        title: "Macbook Magic Mouse 2",
        description: "Yangi avlod Magic Mouse 2 sichqonchasi. Sensorli boshqaruv va teginish sezgirligi yuqori bo‘lib, MacBook bilan ideal moslashuvchanlikni ta’minlaydi. Qo‘l uchun juda qulay shaklga ega va simsiz texnologiya asosida ishlaydi.",
        coin: 30,
        qolganproduct: 50,
        levelRequired: 1
    },
    {
        id: 5,
        image: minimac,
        title: "Macbook Mini Mac",
        description: "Mini Mac – kuchli va ixcham kompyuter, yuqori unumdorlik va samaradorlikni ta’minlaydi. Kichik hajmiga qaramay, katta quvvatga ega bo‘lib, dizaynerlar va dasturchilar uchun qulay variant hisoblanadi. Ko‘p vazifali ishlash uchun ideal tanlov.",
        coin: 500,
        qolganproduct: 3,
        levelRequired: 4
    },
    {
        id: 6,
        image: Airpods,
        title: "Macbook AirPods 2",
        description: "Yangi avlod AirPods 2 quloqchinlari sizga sifatli va tiniq ovoz taqdim etadi. Aktiv shovqinni pasaytirish texnologiyasi bilan jihozlangan bo‘lib, ovozga to‘liq sho‘ng‘ish imkonini beradi. Uzoq muddatli batareya quvvati bilan ishlashga tayyor.",
        coin: 100,
        qolganproduct: 25,
        levelRequired: 2
    }
]


export const getcategory = ["Frontend", "Backend", "SMM"]