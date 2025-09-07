import React from "react";
import { Card, Skeleton } from "@heroui/react";

const CardSkeleton = () => {
  return (
    <Card className="space-y-5 p-4 rounded-none">
      <Skeleton className="">
        <div className="h-[300px] rounded-lg bg-default-300" />
      </Skeleton>
      <div className="space-y-4 py-6">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
        </Skeleton>
      </div>
    </Card>
  );
};

const HomeSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
};

export default HomeSkeleton;
