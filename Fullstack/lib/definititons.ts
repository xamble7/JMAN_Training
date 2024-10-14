import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { StaticImageData } from "next/image";
import { useRouter } from "next/router";
import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string({
        invalid_type_error: "First name has invalid characters",
      })
      .min(1, { message: "First name is required" })
      .trim(),
    lastName: z
      .string({
        invalid_type_error: "Last name has invalid characters",
      })
      .min(1, { message: "Last name is required" })
      .trim(),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid Email Address" })
      .trim(),
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(4, { message: "Password must be at least 4 characters" })
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password field is required" })
      .trim(),
    role: z.string().default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid Email Address" })
    .trim(),
  password: z.string().min(1, { message: "Password is required" }).trim(),
});
export const addCourseSchema = z.object({
  courseName: z
    .string({ invalid_type_error: "Invalid type" })
    .min(1, { message: "Course name is required" })
    .trim(),
  courseDuration: z
    .number({ invalid_type_error: "Invalid type" })
    .min(1, { message: "Duration is required" }),
});

export interface employeeTableColumnDef {
  empid: number;
  profile: StaticImageData;
  empName: string;
  designation: string;
  viewProfile: typeof Button;
}

export interface employeeDetailsCard {
  empid: number;
  empName: string;
  designation: string;
  experience: string;
  birth_date: string;
  hire_date: string;
  salary: string;
  gender: string;
}

export interface displayBannerProps {
  icon: LucideIcon;
  text: string;
  count: number;
  className?: string;
}
