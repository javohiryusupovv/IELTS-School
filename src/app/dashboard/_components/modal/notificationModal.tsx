import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Bell } from "lucide-react"

export default function NotificationModal() {
    return (
        <div>
            <Popover>
                <PopoverTrigger asChild>
                    <article className="relative top-0 left-0 group cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all duration-200">
                        <Bell className="group-hover:scale-110 group-hover:stroke-green-500 stroke-[1.5] transition-all duration-300" />
                        <span className="absolute top-1 right-2 flex h-[10px] w-[10px]">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-green-500"></span>
                        </span>
                    </article>
                </PopoverTrigger>
                <PopoverContent className="w-80 absolute sm:right-2 -right-[70px]">
                    <div>
                        <p className="sm:mb-2 max-sm:text-[14px]">Tizimdagi Yangiliklar</p>
                        <hr className="sm:mb-4 mb-2" />
                        <div className="w-full">
                            <article className="p-2 border rounded mb-3">
                                <h6 className="mb-2 text-green-500/80">💳 To‘lov qo‘shilmoqda</h6>
                                <p className="text-[13px]">
                                    O‘quvchilar to‘lovlari tizimga muvaffaqiyatli qo‘shilmoqda. Har bir to‘lov
                                    kurs narxiga mos ravishda qayd etiladi.
                                </p>
                            </article>

                            <article className="p-2 border rounded mb-3">
                                <h6 className="mb-2 text-blue-500/80">📊 To‘lovlarni kuzatish</h6>
                                <p className="text-[13px]">
                                    Endi siz barcha o‘quvchilarning to‘lov tarixini kuzatishingiz mumkin.
                                    Qarzdorlik va to‘langan summalar aniq ko‘rinadi.
                                </p>
                            </article>

                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
