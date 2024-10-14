"use server";

import { prisma } from "@/lib/utils";
import { unstable_cache } from "next/cache";

export const getEmployees = unstable_cache(
  async () => {
    return await prisma.employees.findMany({
      where: {
        activestatus: "Active",
        NOT: {
          designation: "Principal Architect",
        },
      },
      select: {
        empid: true,
        empname: true,
        designation: true,
      },
    });
  },
  ["employees"],
  { revalidate: 3600, tags: ["employees"] }
);

export const getTeamLeads = unstable_cache(
  async () => {
    return await prisma.employees.findMany({
      where: {
        activestatus: "Active",
        designation: "Principal Architect",
      },
      select: {
        empname: true,
        designation: true,
      },
    });
  },
  ["teamLeads"],
  { revalidate: 3600, tags: ["TL"] }
);

export const getSkillFrequency = async () => {
  const skillFreq: Object[] = [];
  const response = await prisma.skills.findMany({
    select: {
      skillid: true,
      skillname: true,
      _count: {
        select: {
          proficiencies: true,
        },
      },
    },
  });
  response.map((skill) => {
    skillFreq.push({
      skillname: skill.skillname,
      count: skill._count.proficiencies,
    });
  });
  return skillFreq.slice(0, 6);
};

export const getCoursesbyMonth = async () => {
  const completions = await prisma.employeecertifications.groupBy({
    by: "completiondate",

    where: {
      completiondate: {
        not: null,
      },
    },
    _count: {
      completiondate: true,
    },
    orderBy: {
      completiondate: "asc",
    },
  });

  const formattedCompletions = completions.map((completion) => ({
    month: new Date(completion.completiondate!).toLocaleString("default", {
      month: "long",
      year: "numeric",
    }),
    count: completion._count.completiondate,
  }));

  const aggregated: any = {};

  // Iterate through each entry in the data
  formattedCompletions.forEach((entry) => {
    const { month, count } = entry;

    // If the month is already in the aggregated object, add the count
    if (aggregated[month]) {
      aggregated[month] += count;
    } else {
      // Otherwise, set the initial count
      aggregated[month] = count;
    }
  });

  // Convert the aggregated object back to an array
  return Object.keys(aggregated).map((month) => ({
    month,
    count: aggregated[month],
  }));
};

export const getEmployeeDetails = async (id: number) => {
  return await prisma.employees.findUnique({
    where: {
      empid: id,
    },
    select: {
      empid: true,
      experience: true,
      designation: true,
      empname: true,
      hire_date: true,
      birth_date: true,
      gender: true,
      salary: true,
    },
  });
};

export const getEmployeeTopSkills = async (id: number) => {
  const color = ["#2563eb", "#60a8fb", "#bedcfe"];
  const topSkills: { skill: string; proficiency: number; fill: string }[] = [];
  const skillList = await prisma.employeeskillproficiency.findMany({
    where: {
      empid: id,
    },
    include: {
      skill: {
        select: {
          skillname: true, // Fetch only the skill name
        },
      },
    },
    orderBy: {
      proficiency: "desc", // Order skills by proficiency in descending order
    },
    take: 3, // Limit the results to the top 3 skills
  });
  skillList.map((item) => {
    topSkills.push({
      skill: item.skill.skillname!,
      proficiency: item.proficiency!,
      fill: color[skillList.indexOf(item)],
    });
  });
  return topSkills;
};

export const getRecentCertifications = async (id: number) => {
  return await prisma.employeecertifications.findMany({
    where: {
      empid: id,
    },
    include: {
      courses: true,
    },
    orderBy: {
      completiondate: "desc",
    },
  });
};

export const getAssessmentScores = async (id: number) => {
  const assessments: any = [];
  const response = await prisma.assessments.findMany({
    where: {
      empid: id,
    },
    include: {
      courses: true,
    },
    orderBy: {
      test_taken: "asc",
    },
  });
  response.map((item) => {
    assessments.push({
      course: item.courses?.coursename,
      score: item.assessment_score,
    });
  });
  return assessments;
};

export const getRecommendedCourses = async (id: number) => {
  const leastProficientSkills = await prisma.employeeskillproficiency.findMany({
    where: {
      empid: id,
      proficiency: {
        lt: 5,
      },
    },
    include: {
      skill: {
        select: {
          skillname: true,
        },
      },
    },
    orderBy: {
      proficiency: "asc",
    },
  });
  const getCourses: Object[] = [];
  leastProficientSkills.map(async (item) => {
    const response = await prisma.assessments.findMany({
      where: {
        skillid: item.skillid,
      },
      include: {
        courses: {
          select: {
            coursename: true,
          },
        },
      },
    });
    getCourses.push(response);
  });
  return getCourses;
};

export const getDepartmentInfo = async () => {
  return await prisma.employeedept.groupBy({
    by: ["tribe", "tribehead"],
    _count: {
      empid: true,
    },
  });
};

export const addCourses = async (
  courseName: string,
  courseDuration: string
) => {
  const response = await prisma.courses.findFirst({
    where: {
      coursename: courseName,
    },
  });
  if (response) {
    return { error: "Error" };
  }
  return await prisma.courses.create({
    data: {
      coursename: courseName,
      duration: courseDuration,
    },
  });
};
