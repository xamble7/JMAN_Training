import React from "react";
import { displayBannerProps } from "@/lib/definititons";
import { cn } from "@/lib/utils";

const DashboardDisplayBanner = ({
  icon: Icon,
  text,
  count,
  className,
}: displayBannerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col text-white p-4 bg-[#343a40] rounded-lg h-[100%] w-[100%]",
        className
      )}
    >
      {Icon && <Icon size={25} className="text-[#0466c8] ml-auto" />}
      <p className="font-bold text-gray-400 -mt-6">{text}</p>
      <p className="text-lg font-bold text-gray-400">{count}</p>
    </div>
  );
};

export default DashboardDisplayBanner;
