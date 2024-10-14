"use client";

import React from "react";
import { Form, useForm } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { z } from "zod";
import { Button } from "./ui/button";
import { addCourseSchema } from "@/lib/definititons";
import { addCourses } from "@/app/actions/api";

const AddCourse = () => {
  const form = useForm<z.infer<typeof addCourseSchema>>({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      courseName: "",
      courseDuration: 0,
    },
  });

  const handleSubmit = (data: z.infer<typeof addCourseSchema>) => {
    const courseName = data.courseName;
    const courseDuration = data.courseDuration + " weeks";
    console.log(courseDuration);
    // const response = await addCourses(courseName, courseDuration)
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter course name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Duration</FormLabel>
              <FormControl>
                <Input placeholder="Enter course duration" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add course</Button>
      </form>
    </Form>
  );
};

export default AddCourse;
