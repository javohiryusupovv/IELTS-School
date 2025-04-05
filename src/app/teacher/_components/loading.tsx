
import { Skeleton } from "@/components/ui/skeleton";


export default function Loading() {
  return (
    <div className="fixed left-0 top-0 w-[150px] h-screen transition-all duration-300">
       <Skeleton className="w-full h-screen bg-gray-100 rounded-none"/>
       
    </div>
  )
}
