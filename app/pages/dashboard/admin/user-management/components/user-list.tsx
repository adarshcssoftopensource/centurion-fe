"use client";

import * as React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import {
  ArrowDownNarrowWide,
  ChevronsUpDown,
  CirclePlus,
  Edit,
  Eye,
  ListFilter,
  MoreHorizontal,
} from "lucide-react";
import { Checkbox } from "~/components/ui/checkbox";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import { DataTable } from "~/components/data-table";
import { Badge } from "~/components/ui/badge";

const data: User[] = [
  {
    id: "1",
    name: "Miracle Vetrov",
    email: "miracle@gmail.com",
    avatarUrl: "/avatars/1.png",
    division: "Licensing & Supervision",
    role: "Licensing",
    accountStatus: "Active",
    accountType: "Internal",
    lastLogin: "24 June 2025",
  },
  {
    id: "2",
    name: "Maren Herwitz",
    email: "maren@gmail.com",
    avatarUrl: "/avatars/2.png",
    division: "Legal Service",
    role: "Legal",
    accountStatus: "Inactive",
    accountType: "External",
    lastLogin: "24 June 2025",
  },
];

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  division: string;
  role: string;
  accountStatus: "Active" | "Inactive";
  accountType: "Internal" | "External";
  lastLogin: string;
};

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "User",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          {/* <Image
            src={user.avatarUrl}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full object-cover"
          /> */}
          <div>
            <div className="font-medium">{user.name}</div>
            <div className="text-xs text-muted-foreground">{user.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "division",
    header: "Division",
    cell: ({ row }) => <div>{row.original.division}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-sm">
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "accountStatus",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Account Status
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.accountStatus;
      return <Badge variant="outline">{status}</Badge>;
    },
  },
  {
    accessorKey: "accountType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Account Type
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <Badge variant="secondary">{row.original.accountType}</Badge>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last login
        <ChevronsUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <div>{row.original.lastLogin}</div>,
  },
  {
    id: "actions",
    header: "",
    cell: () => (
      <div className="flex gap-2 justify-end">
        <Button size="icon" variant="ghost">
          <Eye />
        </Button>
        <Button size="icon" variant="ghost">
          <Edit />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

function UserList() {
  return (
    <DataTable
      tableTitle="List of Users"
      columns={userColumns}
      data={data}
      actions={
        <>
          <Button className="p-2 " variant={"outline"}>
            <ListFilter />
            Filter
          </Button>
          <Button className="p-2" variant={"outline"}>
            <ArrowDownNarrowWide />
            Sort by
          </Button>
          <Button className="p-2 text-[14px]">
            <CirclePlus />
            Create new user
          </Button>
        </>
      }
    />
  );
}
export default UserList;
