export const formatUzbekPhone = (input: string): string => {
    let value = input.replace(/\D/g, ""); // Faqat raqamlarni qoldiramiz
    value = value.replace(/^998/, ""); // Agar 998 ni kiritsa, olib tashlaymiz
    value = value.slice(0, 9); // Maksimal 9 ta raqam kiritish mumkin
    return "+998 " + value;;
};