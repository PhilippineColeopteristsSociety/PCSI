import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
export default function CardSkeleton({totalCard }) {
  return (
    <>
    {Array.from({ length: totalCard }).map((_, index) => (
    <div key={index} className="flex flex-col shadow-sm  rounded-lg  overflow-clip mb-4">
      <div
        className="h-[192px]  overflow-clip bg-muted"
      ></div>
      <div className="p-5 ">
        <h1 className="font-serif font-semibold">
            <Skeleton className="h-5" />
        </h1>
        <div 
          className="mt-4 space-y-2"
        >
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 " />
            <Skeleton className="h-5 w-3/4" />
        </div>

      </div>
    </div>
    ))}
    </>
  );
}
