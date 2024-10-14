"use client";

import { ColumnDef } from "@tanstack/react-table";
import { employeeTableColumnDef } from "@/lib/definititons";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns: ColumnDef<employeeTableColumnDef>[] = [
  {
    accessorKey: "empname",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    id: "profile",
    header: "",
    cell: ({ row }) => (
      <Link href={`/dashboard/${row.original.empid}`}>
        <Button className="text-xs bg-[#00a6fb]">View Profile</Button>
      </Link>
    ),
  },
];
