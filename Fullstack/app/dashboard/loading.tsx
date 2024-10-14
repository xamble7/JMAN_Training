import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DashboardLoading = () => {
  return (
    <>
      <main className="flex flex-col md:flex-row flex-wrap gap-10 w-full md:w-[60vw] h-auto md:h-[98vh] ml-0 md:ml-[270px] mt-2 bg-[#212529] rounded-lg relative">
        <div className="absolute top-3 left-4 md:left-8 text-white">
          <h1 className="text-[2rem] md:text-[2.5rem]">
            <Skeleton className="w-72 h-12 mb-1 bg-gray-600" />
          </h1>
          <p className="text-gray-500 text-xs md:text-sm">
            <Skeleton className="w-60 h-6 bg-gray-600" />
          </p>
        </div>

        <div className="absolute top-[13vh] right-2 md:right-10 flex flex-col w-[80%] md:w-1/4 gap-y-5 align-middle">
          <Skeleton className="flex items-center gap-2 p-4 bg-gray-600 rounded-lg">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-24 h-5" />
          </Skeleton>
          <Skeleton className="flex items-center gap-2 p-4 bg-gray-600 rounded-lg">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-24 h-5" />
          </Skeleton>
          <Skeleton className="flex items-center gap-2 p-4 bg-gray-600 rounded-lg">
            <Skeleton className="w-6 h-6" />
            <Skeleton className="w-24 h-5" />
          </Skeleton>
        </div>

        <Skeleton className="w-[18vw] h-[30vh] absolute top-[12.7vh] left-10 bg-gray-600" />
        <Skeleton className="w-[18vw] h-[30vh] absolute top-[12.7vh] left-[22vw] bg-gray-600" />

        <div className="absolute bottom-8 left-4 md:left-6 ml-2 border rounded-xl rounded-br-md px-4 md:px-8 py-2 h-auto md:h-[48vh] bg-[#343a40] w-[56vw]">
          <Skeleton className="w-[52vw] h-96 mt-5 bg-gray-600" />
        </div>
      </main>
      <div className="h-[80vh] md:h-[98vh] w-[90vw] md:w-[25vw] bg-[#212529] absolute right-2 top-2 rounded-l-lg rounded-r-[3.4rem]">
        <div className="flex flex-row text-white absolute top-6 right-4 md:right-10">
          <Skeleton className="w-48 h-10 mt-1 bg-gray-600" />
          <Skeleton
            className="rounded-full mt-1 ml-4 bg-gray-600"
            style={{ width: 40, height: 40 }}
          />
        </div>

        <div className="w-full rounded-[2rem] rounded-tr-none text-white absolute bottom-4 ml-2">
          <h1 className="text-xl md:text-2xl font-bold mt-4 ml-4">
            <Skeleton className="w-24 h-6" />
          </h1>
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className="flex flex-row align-middle p-2 ml-2 mt-5"
              key={index}
            >
              <div className="bg-white rounded-lg p-2">
                <Skeleton
                  className="text-black"
                  style={{ width: 30, height: 30 }}
                />
              </div>
              <div className="flex flex-col">
                <Skeleton className="w-48 h-5 font-semibold ml-5 mb-2 bg-gray-400" />
                <Skeleton className="w-32 h-4 text-xs font-light bg-gray-400 ml-5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashboardLoading;
