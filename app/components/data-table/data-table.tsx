'use client';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type TableOptions,
} from '@tanstack/react-table';
import { Table } from '../ui/table';
import CustomTableHeader from './custom-table-header';
import TablePagination from './custom-table-pagination';
import CustomTableBody from './custom-table-body';
import TableFilter from './table-filter';
import { useState } from 'react';
import Heading from '../typography/heading';

interface DataTableProps<T> {
  filterKey?: string;
  tableTitle: string;
  data: T[];
  columns: ColumnDef<T, any>[];
  options?: Omit<TableOptions<T>, 'data' | 'columns' | 'getCoreRowModel'>;
  isPagination?: boolean;
  isFilter?: boolean;
  actions?: React.ReactNode;
}

function DataTable<T>({
  tableTitle,
  data = [],
  columns = [],
  isPagination = true,
  isFilter = true,
  actions,
}: DataTableProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      globalFilter,
      sorting,
    },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    enableGlobalFilter: true,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex  md:flex-row md:justify-between md:items-center flex-col gap-2 md:gap-0 justify-start items-start">
        <Heading className="font-medium">{tableTitle}</Heading>
        <div className="flex flex-row gap-2 items-center w-full md:max-w-[calc(100%-200px)] md:justify-end max-w-[100%] justify-start ">
          {isFilter && <TableFilter table={table} />}
          {actions}
        </div>
      </div>
      {/* Table */}
      <div className="bg-background overflow-hidden">
        <Table className="table-fixed text-[#444955]">
          {/* table header */}
          <CustomTableHeader table={table} />
          {/* table body */}
          <CustomTableBody table={table} totalColumn={columns.length} />
        </Table>
      </div>
      {/* Pagination */}
      {isPagination && <TablePagination table={table} />}
    </div>
  );
}
export default DataTable;
