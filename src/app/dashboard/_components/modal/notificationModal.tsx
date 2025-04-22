



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
                <PopoverContent className="w-80 absolute right-2">
                    <div>
                        <p className="mb-2">Tizimdagi Yangiliklar</p>
                        <hr className="mb-4"/>
                        <div className="w-full">
                            <article className="p-2 border rounded mb-3">
                                <h6 className="mb-2 text-orange-500/80">📢 Yangi imkoniyatlar haqida:</h6>
                                <p className="text-[13px]">Endi siz coinX orqali bevosita kurslarga yozilishingiz mumkin! Tajribangizni kengaytiring va yangiliklardan birinchilardan bo‘lib foydalaning.</p>
                            </article>
                            <article className="p-2 border rounded mb-3">
                                <h6 className="mb-2 text-orange-500/80">⚙️ Texnik xizmat</h6>
                                <p className="text-[13px]">22-aprel kuni soat 01:00 dan 03:00 gacha tizimda texnik ishlar olib boriladi. Shu vaqt ichida ayrim xizmatlar vaqtincha ishlamasligi mumkin</p>
                            </article>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
