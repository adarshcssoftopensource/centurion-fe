"use client";

import {
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import type { Table } from "@tanstack/react-table";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
interface PaginationProps<T> {
  table: Table<T>;
}

function getPaginationRange(current: number, total: number) {
  const delta = 2;
  const range = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) range.unshift("...");
  if (current + delta < total - 1) range.push("...");

  range.unshift(1);
  if (total > 1) range.push(total);

  return range;
}

function TablePagination<T>({ table }: PaginationProps<T>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;
  const pageCount = table.getPageCount();
  const paginationRange = getPaginationRange(pageIndex + 1, pageCount);

  return (
    <div className="flex items-center justify-between gap-4 px-2 py-3">
      {/* Page info */}
      <div className="text-sm text-muted-foreground whitespace-nowrap">
        Page <span className="text-foreground">{pageIndex + 1}</span> of{" "}
        <span className="text-foreground">{pageCount}</span>
      </div>

      {/* Page controls */}
      <Pagination>
        <PaginationContent className="flex items-center gap-1">
          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronFirstIcon size={16} />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon size={16} />
            </Button>
          </PaginationItem>

          {paginationRange.map((page, index) =>
            typeof page === "string" ? (
              <PaginationItem key={index}>
                <span className="px-2 text-sm text-muted-foreground">…</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <Button
                  variant={pageIndex + 1 === page ? "default" : "outline"}
                  size="icon"
                  className="w-8 h-8"
                  onClick={() => table.setPageIndex(page - 1)}
                >
                  {page}
                </Button>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button
              size="icon"
              variant="outline"
              onClick={() => table.setPageIndex(pageCount - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronLastIcon size={16} />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Rows per page */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} / page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default TablePagination;
