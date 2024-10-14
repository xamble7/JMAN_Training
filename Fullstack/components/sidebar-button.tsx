"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface sidebarbuttonprops {
  label: string;
  icon?: LucideIcon;
  href: string;
  className?: string;
}

const SideBarButton = ({
  label,
  icon: Icon,
  href,
  className,
}: sidebarbuttonprops) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex flex-row gap-2 px-4 py-4 h-14 w-10/12 ml-4 rounded-3xl",
        className
      )}
    >
      {Icon && <Icon size={20} className="mt-0.5" />}
      <h2>{label}</h2>
    </Link>
  );
};

export default SideBarButton;
