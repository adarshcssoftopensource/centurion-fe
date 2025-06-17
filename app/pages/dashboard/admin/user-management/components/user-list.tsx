'use client';

import { type ColumnDef } from '@tanstack/react-table';
import userImg from '~/assets/images/user-img.png';
import userImg2 from '~/assets/images/user-img-2.jpg';
import { ArrowDownNarrowWide, CirclePlus, Edit, Eye, ListFilter, MoreVertical } from 'lucide-react';
import { Checkbox } from '~/components/ui/checkbox';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

import { DataTable } from '~/components/data-table';
import { Badge } from '~/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

const data: User[] = [
  {
    id: '1',
    name: 'Miracle Vetrov',
    email: 'miracle@gmail.com',
    avatarUrl: userImg,
    division: 'Licensing & Supervision',
    role: 'Licensing',
    accountStatus: 'Active',
    accountType: 'Internal',
    lastLogin: '24 June 2025',
  },
  {
    id: '2',
    name: 'Maren Herwitz',
    email: 'maren@gmail.com',
    avatarUrl: userImg2,
    division: 'Legal Service',
    role: 'Legal',
    accountStatus: 'Inactive',
    accountType: 'External',
    lastLogin: '24 June 2025',
  },
  {
    id: '3',
    name: 'Talan George',
    email: 'Talen@gmail.com',
    avatarUrl: userImg,
    division: 'Legal Service',
    role: 'Legal',
    accountStatus: 'Inactive',
    accountType: 'External',
    lastLogin: '24 June 2025',
  },
];

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  division: string;
  role: string;
  accountStatus: 'Active' | 'Inactive';
  accountType: 'Internal' | 'External';
  lastLogin: string;
};

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

const userColumns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: ({ table }) => {
      return (
        <div className="flex gap-2.5 ">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
          <span>User</span>
        </div>
      );
    },
    enableSorting: true,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex gap-2.5 items-center">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage className="size-10" alt={user.name} src={user.avatarUrl} />
              <AvatarFallback className=" uppercase">{user.name?.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </div>
      );
    },
    size: 268,
  },
  {
    accessorKey: 'division',
    header: 'Division',
    cell: ({ row }) => <div>{row.original.division}</div>,
    size: 142,
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="text-sm flex gap-1 items-center py-2 px-3 rounded-full leading-3.5 "
      >
        {row.original.role}
      </Badge>
    ),
    size: 142,
  },
  {
    accessorKey: 'accountStatus',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Account Status
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const status = row.original.accountStatus;
      return (
        <Badge
          className="text-sm flex gap-1 items-center py-2 px-3 rounded-full leading-3.5 "
          variant="outline"
        >
          {status}
        </Badge>
      );
    },
    size: 142,
  },
  {
    accessorKey: 'accountType',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Account Type
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => (
      <Badge
        className="text-sm flex gap-1 items-center py-2 px-3 rounded-full leading-3.5 "
        variant="outline"
      >
        {row.original.accountType}
      </Badge>
    ),
    size: 142,
  },
  {
    accessorKey: 'lastLogin',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="p-0"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Last login
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => <div>{row.original.lastLogin}</div>,
    size: 142,
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <div className="flex  justify-end">
        <Button size="icon" variant="ghost">
          <Eye />
        </Button>
        <Button size="icon" variant="ghost">
          <Edit />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreVertical />
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
    <div className="bg-(--color-white) p-5 rounded-t-3xl">
      <DataTable
        tableTitle="List of Users"
        columns={userColumns}
        data={data}
        actions={
          <>
            <Button className="p-2 bg-white hover:bg-white" variant={'outline'}>
              <ListFilter />
              Filter
            </Button>
            <Button className="p-2 bg-white hover:bg-white" variant={'outline'}>
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
    </div>
  );
}
export default UserList;
