import { Skeleton } from "@/components/ui/skeleton";
import uuid4 from "uuid4";


export default function ISLoading() {
  return (
    <div>
      <div className="w-full h-[230px] mb-4 flex justify-between relative top-20 gap-4">
            <Skeleton className="w-[130px] h-[150px] bg-[#ffffff83] rounded-none rounded-t-3xl">
              <Skeleton className=" absolute z-[1] -top-10 left-[18px] w-20 h-20 rounded-full bg-[#ffffff83]"></Skeleton>
            </Skeleton>
            <Skeleton className="relative -top-6 w-[130px] h-[150px] bg-[#ffffff83] rounded-none rounded-t-3xl">
              <Skeleton className="absolute z-[1] -top-12 left-[19%] w-20 h-20 rounded-full bg-[#ffffff83]"></Skeleton>
            </Skeleton>
            <Skeleton className="w-[130px] h-[150px] bg-[#ffffff83] rounded-none rounded-t-3xl">
              <Skeleton className=" absolute z-[1] -top-10 right-4 w-20 h-20 rounded-full bg-[#ffffff83]"></Skeleton>
            </Skeleton>
      </div>
      <div className="w-full flex flex-col gap-3">
          {Array.from({length: 5}).map((_, ) => (
                  <div key={uuid4()}>
                    <Skeleton className="w-full h-[55px] bg-[#ffffff83]" />
                  </div>
          ))}
      </div>
    </div>
  );
}
