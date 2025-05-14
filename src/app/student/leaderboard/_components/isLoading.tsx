import { Skeleton } from "@/components/ui/skeleton";

import uuid4 from "uuid4";

export default function ISLoading() {
  return (
    <div>
      <div className="w-full flex justify-center relative top-14 gap-4">
        {Array.from({ length: 3 }).map((_) => (
          <div key={uuid4()}>
            <Skeleton className="w-[130px] h-[150px] bg-red-500 rounded-none rounded-t-md">
              <Skeleton className=" absolute z-[1] -top-10 left-6 w-20 h-20 rounded-full bg-yellow-50"></Skeleton>
            </Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
}
