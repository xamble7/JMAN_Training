import React from "react";
import { prisma } from "@/lib/utils";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  CircleUserRound,
  GraduationCap,
  SquareUserRound,
  Users,
} from "lucide-react";
import DashboardDisplayBanner from "@/components/dashboard-display-banner";
import { SkillRadar } from "@/app/dashboard/skilldistradar";
import { CourseCompletionRate } from "./courseCompletionRate";
import {
  getEmployees,
  getTeamLeads,
  getSkillFrequency,
  getCoursesbyMonth,
} from "../actions/api";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/options";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  const employees: any = await getEmployees();
  const teamleads: any = await getTeamLeads();
  const skillCount = await getSkillFrequency();
  const coursesByMonth = await getCoursesbyMonth();
  const courseCount = await prisma.courses.count();
  const assessmentCount = await prisma.assessments.count();
  const employeeCount = await prisma.employees.count({
    where: {
      activestatus: "Active",
    },
  });
  return (
    <>
      <main className="flex flex-col md:flex-row flex-wrap gap-10 w-full md:w-[60vw] h-auto md:h-[98vh] ml-0 md:ml-[270px] mt-2 bg-[#212529] rounded-lg relative">
        <div className="absolute top-3 left-4 md:left-8 text-white">
          <h1 className="text-[2rem] md:text-[2.5rem]">{`Hello ${
            session.user.name!.split(" ")[0]
          }`}</h1>
          <p className="text-gray-500 text-xs md:text-sm">
            Here you can track the employee's skill and competencies
          </p>
        </div>

        <div className="absolute top-[13vh] right-2 md:right-10 flex flex-col w-[80%] md:w-1/4 gap-y-5 align-middle">
          <DashboardDisplayBanner
            text="Employees"
            icon={Users}
            count={employeeCount}
          />
          <DashboardDisplayBanner
            text="Total Courses"
            icon={GraduationCap}
            count={courseCount}
          />
          <DashboardDisplayBanner
            text="Total Assessments"
            icon={Users}
            count={assessmentCount}
          />
        </div>

        <SkillRadar chartData={skillCount} />
        <CourseCompletionRate
          chartData={coursesByMonth}
          className="absolute top-[12.7vh] left-[22vw]"
        />

        <div className="absolute bottom-8 left-4 md:left-6 ml-2 border rounded-xl rounded-br-md px-4 md:px-8 py-2 h-auto md:h-[48vh] bg-[#343a40]">
          <DataTable columns={columns} data={employees} />
        </div>
      </main>

      <div className="h-[80vh] md:h-[98vh] w-[90vw] md:w-[25vw] bg-[#212529] absolute right-2 top-2 rounded-l-lg rounded-r-[3.4rem]">
        <div className="flex flex-row text-white absolute top-6 right-4 md:right-10">
          <h1 className="text-[1rem] md:text-[1.2rem] font-bold mt-2.5">
            {session.user.name}
          </h1>
          <CircleUserRound
            size={40}
            className="text-[#0466c8] rounded-full mt-1 ml-4"
          />
        </div>

        <div className="w-full rounded-[2rem] rounded-tr-none text-white absolute bottom-4 ml-2">
          <h1 className="text-xl md:text-2xl font-bold mt-4 ml-4">
            Team Leads
          </h1>
          {Object.keys(teamleads)
            .slice(0, 5)
            .map((item) => (
              <div
                className="flex flex-row align-middle p-2 ml-2 mt-5"
                key={item}
              >
                <div className="bg-white rounded-lg p-2">
                  <SquareUserRound size={30} className="text-black" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-md ml-5">
                    {teamleads[item].empname}
                  </p>
                  <p className="text-xs font-light text-gray-400 ml-5">
                    {teamleads[item].designation}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
