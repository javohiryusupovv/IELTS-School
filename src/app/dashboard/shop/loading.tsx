import { Skeleton } from "@/components/ui/skeleton";
import uuid4 from "uuid4";

export default async function Loading() {

  return (
    <div>
      <article className="flex justify-between items-center mb-2">
        <Skeleton className="w-[100px] h-[30px] mb-10 text-[18px] font-medium" />
      </article>
      <div className="w-full grid grid-cols-4 gap-4">
        {Array.from({length: 3}).map((_, ) => (
          <div key={uuid4()}>
            <Skeleton className="w-full h-[280px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
