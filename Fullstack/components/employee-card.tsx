"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { employeeDetailsCard } from "@/lib/definititons";

const EmployeeCard = async ({
  empid,
  empName,
  designation,
  experience,
  salary,
  gender,
  hire_date,
  birth_date,
}: employeeDetailsCard) => {
  return (
    <Card className="bg-[#212529] w-[350px] absolute bottom-[50px] left-8 rounded-none border-none p-0 m-0">
      <CardHeader></CardHeader>
      <CardContent className="flex flex-col gap-y-5 text-gray-300 w-full text-sm">
        <div className="flex flex-row w-full justify-between">
          <p>EmployeeID</p>
          <p className="flex justify-end">{empid}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p>Name</p>
          <p className="flex justify-end">{empName}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p>Designation</p>
          <p className="flex justify-end">{designation}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p>Experience</p>
          <p className="flex justify-end">{experience}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p>D.O.B</p>
          <p className="flex justify-end">{birth_date}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p>Hire Date</p>
          <p className="flex justify-end">{hire_date}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p>Salary</p>
          <p className="flex justify-end">{salary}</p>
        </div>
        <div className="flex flex-row w-full justify-between">
          <p>Gender</p>
          <p className="flex justify-end">{gender}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmployeeCard;
