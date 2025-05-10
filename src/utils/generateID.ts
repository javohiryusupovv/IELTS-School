export function generateRandomID(prefix = "iq"){
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${prefix}-${randomNumber}`
}