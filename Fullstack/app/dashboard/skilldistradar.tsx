"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
} from "../../components/ui/chart";

export const description = "A radar chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#0466c8",
  },
} satisfies ChartConfig;

export function SkillRadar({ chartData }: { chartData: Object[] }) {
  return (
    <Card className="bg-[#343a40] h-[250px] md:h-[300px] mt-6 md:mt-[120px] mx-auto md:ml-8 w-[90vw] md:w-[350px]">
      <CardHeader className="items-center pb-2 md:pb-4 text-white mb-4">
        <CardTitle className="text-center text-lg md:text-xl">
          Top Skills in the Organization
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 -mt-6 md:-mt-10">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[220px] md:max-h-[270px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="skillname" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-desktop)"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
