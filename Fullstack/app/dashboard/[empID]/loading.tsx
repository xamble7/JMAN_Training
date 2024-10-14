import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const EmployeeProfileLoading = async () => {
  const promise = await new Promise(function (resolve) {
    setTimeout(resolve, 2000);
  });
  return (
    <main className="w-[85vw] h-[98vh] bg-[#212529] ml-[270px] mt-2 rounded-lg relative">
      <Skeleton className="h-[400px] w-[300px] ml-14 absolute mt-12 rounded-xl" />

      <div className="bg-gray-500 absolute left-10 bottom-[430px] h-[1px] w-[17.5vw]"></div>

      <div className="p-4 bg-gray-600 rounded-xl absolute left-10 bottom-[380px] w-[17.5vw]">
        <Skeleton className="h-5 w-32 mb-2 bg-gray-400" />
        <Skeleton className="h-4 w-24 mb-1 bg-gray-400" />
        <Skeleton className="h-4 w-16 mb-1 bg-gray-400" />
        <Skeleton className="h-4 w-20 mb-1 bg-gray-400" />
        <Skeleton className="h-4 w-20 mb-1 bg-gray-400" />
        <Skeleton className="h-4 w-20 mb-1 bg-gray-400" />
        <Skeleton className="h-4 w-16 bg-gray-400" />
      </div>

      <Skeleton className="absolute left-[25vw] top-[6vh] w-[23vw] h-[40.5vh] bg-gray-600" />
      <ul className="absolute left-[25vw] top-[55vh] min-w-[15vw] bg-[#343a40] p-6 text-gray-500 rounded-xl">
        <h1 className="font-bold text-white">
          <Skeleton className="h-5 w-60" />
        </h1>
        {Array.from({ length: 3 }).map((_, index) => (
          <li className="w-full flex flex-col p-2" key={index}>
            <Skeleton className="h-4 w-40 mb-1" />
            <Skeleton className="h-3 w-30" />
          </li>
        ))}
      </ul>
      <Skeleton className="w-[30vw] bg-gray-600 absolute left-[50vw] top-[6vh] h-[40.5vh]" />
    </main>
  );
};

export default EmployeeProfileLoading;
