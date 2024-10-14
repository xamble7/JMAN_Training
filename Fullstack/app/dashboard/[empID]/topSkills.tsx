"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// You can add custom chart configuration for the skills here
const chartConfig = {
  proficiency: {
    label: "Proficiency",
  },
  js: {
    label: "JavaScript",
    color: "hsl(var(--chart-1))",
  },
  python: {
    label: "Python",
    color: "hsl(var(--chart-2))",
  },
  css: {
    label: "CSS",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

// This component accepts `chartData` dynamically fetched from an API or passed as a prop
export function TopSkills({
  chartData,
  className,
}: {
  chartData: Array<{ skill: string; proficiency: number; fill: string }>;
  className?: string;
}) {
  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-white font-bold">
          Top 3 Skills - Proficiency
        </CardTitle>
        <CardDescription>Current proficiency levels</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* Dynamically render the pie chart based on fetched chartData */}
            <Pie
              data={chartData}
              dataKey="proficiency"
              nameKey="skill"
              innerRadius={60}
              outerRadius={100}
              fill={(entry: any) => entry.fill} // Fill the chart with respective skill colors
              label={(entry) => entry.skill} // Display skill names as labels
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing proficiency for the top 3 skills
        </div>
      </CardFooter>
    </Card>
  );
}
