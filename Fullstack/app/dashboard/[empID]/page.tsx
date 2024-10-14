import React from "react";
import Image from "next/image";
import employee from "../../../public/employee.png";
import FEmployee from "../../../public/employeeF.png";
import EmployeeCard from "@/components/employee-card";
import {
  getAssessmentScores,
  getEmployeeDetails,
  getEmployeeTopSkills,
  getRecentCertifications,
  getRecommendedCourses,
} from "@/app/actions/api";
import { USDollar } from "@/lib/utils";
import { AssessmentTrend } from "./assessmentsOverTime";
import { TopSkills } from "./topSkills";

const EmployeeProfile = async ({ params }: { params: { empID: string } }) => {
  const employeeID = parseInt(params.empID);
  const employeeDetails = await getEmployeeDetails(employeeID);
  const topSkills = await getEmployeeTopSkills(employeeID);
  const recentCertifications = await getRecentCertifications(employeeID);
  const assessmentScores = await getAssessmentScores(employeeID);
  const recommendedCourses = await getRecommendedCourses(employeeID);
  console.log(recommendedCourses);
  return (
    <main className="w-[85vw] h-[98vh] bg-[#212529] ml-[270px] mt-2 rounded-lg relative">
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
      <TopSkills
        chartData={topSkills}
        className="absolute left-[25vw] top-[6vh] w-[23vw] bg-[#343a40] h-[40.5vh]"
      />
      <ul className="absolute left-[25vw] top-[55vh] min-w-[15vw] bg-[#343a40] p-6 text-gray-500 rounded-xl">
        <h1 className="font-bold text-white">
          Recent Completed Certifications
        </h1>
        {recentCertifications.slice(0, 3).map((item) => (
          <li
            className="w-full flex flex-col p-2"
            key={recentCertifications.indexOf(item)}
          >
            <span>{item.courses.coursename}</span>
            <span className="text-sm">
              {`Completed: ${item.completiondate?.toDateString()}`}
            </span>
          </li>
        ))}
      </ul>
      <AssessmentTrend
        chartData={assessmentScores}
        className="w-[30vw] bg-[#343a40] absolute left-[50vw] top-[6vh] "
      />
    </main>
  );
};

export default EmployeeProfile;
