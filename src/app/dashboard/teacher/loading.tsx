import { Skeleton } from "@/components/ui/skeleton";

import uuid4 from "uuid4";

export default async function Loading() {

  return (
    <div>
      <article className="flex justify-between items-center mb-2">
        <Skeleton className="h-7 w-[120px] rounded-full" />
        <Skeleton className="h-11 w-[150px] rounded-full" />
      </article>
      <hr className="mb-7" />
      <div className="w-full grid grid-cols-4 gap-4">
        {Array.from({length: 3}).map((_, ) => (
          <div key={uuid4()}>
            <Skeleton className="w-full h-[40px] rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
