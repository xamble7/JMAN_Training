import { prisma, USDollar } from "@/lib/utils";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import EmployeeCard from "@/components/employee-card";
import Image from "next/image";
import employee from "../../public/employee.png";
import FEmployee from "../../public/employeeF.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { getDepartmentInfo } from "../actions/api";
import { redirect } from "next/navigation";
import AddCourse from "@/components/add-course";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  const employeeDetails = await prisma.employees.findUnique({
    where: {
      empid: parseInt(session!.user.id),
    },
  });
  const courses = await prisma.courses.findMany();
  const departments = await getDepartmentInfo();
  return (
    <main className="bg-[#212529] w-[85vw] h-[98vh] absolute left-[14vw] top-2 rounded-lg">
      <Image
        src={employeeDetails?.gender === "Female" ? FEmployee : employee}
        alt="employee_photo"
        className="h-[400px] w-[300px] ml-14 absolute mt-12 rounded-xl"
      />
      <div className="bg-gray-500 absolute left-10 bottom-[430px] h-[1px] w-[17.5vw]"></div>
      <EmployeeCard
        empid={employeeDetails?.empid!}
        empName={employeeDetails?.empname!}
        designation={employeeDetails?.designation!}
        experience={employeeDetails?.experience!}
        birth_date={employeeDetails?.birth_date!.toDateString()!}
        hire_date={employeeDetails?.hire_date!.toDateString()!}
        salary={USDollar.format(employeeDetails?.salary!)}
        gender={employeeDetails?.gender!}
      />
      <ScrollArea className="h-72 w-[25vw] absolute left-[22vw] top-12 border p-5 rounded-lg text-gray-500">
        <h1 className="mb-4 text-lg font-bold leading-none text-white">
          Courses
        </h1>
        {courses.map((item) => (
          <div key={courses.indexOf(item)}>
            <div className="flex flex-row gap-4 w-96 text-sm">
              <span>{item.courseid}</span>
              <span>{item.coursename}</span>
              <span className="flex justify-end ml-auto">{item.duration}</span>
            </div>
            <Separator className="my-2" />
          </div>
        ))}
      </ScrollArea>
      <ScrollArea className="h-72 w-[25vw] absolute left-[22vw] top-28 border p-5 rounded-lg text-gray-500">
        <h1 className="mb-4 text-lg font-bold leading-none text-white">
          Departments
        </h1>
        <div className="flex flex-row gap-4 w-96 text-md mb-2 font-bold">
          <span>Tribe Head</span>
          <span className="flex justify-center ml-auto">Tribe</span>
          <span className="flex justify-end ml-auto">Employees</span>
        </div>
        <Separator className="my-2" />
        {departments.map((item) => (
          <div key={departments.indexOf(item)}>
            <div className="flex flex-row justify-between items-center gap-4 w-96 text-sm">
              <span className="flex-1">
                {item.tribehead!.charAt(0).toUpperCase() +
                  item.tribehead!.slice(1)}
              </span>
              <span className="flex-1 text-center">
                {item.tribe!.charAt(0).toUpperCase() + item.tribe!.slice(1)}
              </span>
              <span className="flex-1 text-right">{item._count.empid}</span>
            </div>
            <Separator className="my-2 text-gray-400" />
          </div>
        ))}
      </ScrollArea>
      {/* <AddCourse /> */}
    </main>
  );
};

export default Profile;
