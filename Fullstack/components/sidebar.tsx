"use client";

// import { useState } from "react";
import { Contact, LayoutDashboard } from "lucide-react";
import SideBarButton from "./sidebar-button";
import sidebarperson from "../public/sidebarperson.png";
import Image from "next/image";
import byee from "../public/byee.png";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const sidebarlinks = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/profile", icon: Contact, label: "Profile" },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="w-60 h-[98vh] rounded-[3rem] rounded-r-lg ml-3 mt-2 fixed top-0 left-0 bg-[#212529] text-white">
      <div className="flex flex-row ml-6 mt-4">
        <Image
          src={sidebarperson}
          alt=""
          className="rounded-full w-[40px] h-[40px] mt-4 ml-4"
        />
        <h1 className="text-2xl font-bold mt-5 ml-6 text-wrap w-[20px] text-[#00a6fb]">
          Skillex
        </h1>
      </div>
      <div className="flex flex-col gap-4 w-full mt-16">
        {sidebarlinks.map((link, index) => (
          <SideBarButton
            key={index}
            href={link.href}
            label={link.label}
            icon={link.icon}
            className={
              pathname === link.href
                ? "bg-white text-black"
                : "hover:bg-white hover:text-black"
            }
          />
        ))}
      </div>
      <div className="absolute h-[150px] bottom-10 left-8 w-[170px] bg-[#343a40] rounded-lg">
        <Image
          src={byee}
          alt=""
          className="mix-blend-color-burn z-10 absolute -top-24 left-1/2 -translate-x-1/2"
        />
        <Button
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#0466c8] w-[100px]"
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
