"use client";

import { flexRender, type Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";

interface CustomTableBodyProps<T> {
  table: Table<T>;
  totalColumn: number;
}

function CustomTableBody<T>({ table, totalColumn }: CustomTableBodyProps<T>) {
  const rows = table.getRowModel().rows;
  console.log({ rows });

  return (
    <TableBody>
      {rows.length > 0 ? (	
        rows.map((row) => (
          <TableRow
            key={row.id}
            data-state={row.getIsSelected() ? "selected" : undefined}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="last:py-0">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={totalColumn} className="h-24 text-center">
            No results found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}

export default CustomTableBody;
