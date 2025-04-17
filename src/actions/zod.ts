
import {z} from 'zod'


export const IDSchema = z.object({
    idStudent: z.number()
    .min(1, {message: "ID 1 dan oshsin"})
    .max(5, {message: "ID 5 tadan oshmasligi kerak"})
})