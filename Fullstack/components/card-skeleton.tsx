"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <Card className="w-[250px] h-[300px] flex flex-col items-center">
      <CardHeader>
        <Skeleton />
        <CardTitle>
          <Skeleton />
        </CardTitle>
        <CardDescription>
          <Skeleton />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </CardContent>
      <CardFooter>
        <Skeleton />
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
