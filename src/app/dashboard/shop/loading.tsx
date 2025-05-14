import { Skeleton } from "@/components/ui/skeleton";
import uuid4 from "uuid4";

export default async function Loading() {
  return (
    <div>
      <article className="flex justify-between items-center mb-2">
        <Skeleton className="w-[100px] h-[30px] mb-10 text-[18px] font-medium" />
      </article>
      <div className="grid max-shopgrid:grid-cols-1 lg:grid-cols-3 grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-4 justify-center w-full ">
        {Array.from({ length: 3 }).map((_) => (
          <div key={uuid4()}>
            <Skeleton className="w-full h-[280px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
