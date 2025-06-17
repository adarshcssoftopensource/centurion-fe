import { flexRender, type Table } from '@tanstack/react-table';
import { TableHead, TableHeader, TableRow } from '../ui/table';
import { cn } from '~/lib/utils';
import { ChevronsUpDown } from 'lucide-react';
interface CustomTableHeaderProps<T> {
  table: Table<T>;
}
function CustomTableHeader<T = any>({ table }: CustomTableHeaderProps<T>) {
  return (
    <TableHeader className="[&_tr]:border-b-0">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className="hover:bg-transparent border-b-0">
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                key={header.id}
                style={{ width: `${header.getSize()}px` }}
                className="h-9 px-3"
              >
                {header.isPlaceholder ? null : header.column.getCanSort() ? (
                  <div
                    className={cn(
                      header.column.getCanSort() &&
                        'flex h-full cursor-pointer items-center gap-2 select-none',
                    )}
                    onClick={
                      header.column.columnDef.enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    onKeyDown={(e) => {
                      // Enhanced keyboard handling for sorting
                      if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
                        e.preventDefault();
                        header.column.getToggleSortingHandler()?.(e);
                      }
                    }}
                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.columnDef.enableSorting && (
                      <ChevronsUpDown className={cn('ml-2 h-4 w-4')} />
                    )}
                  </div>
                ) : (
                  flexRender(header.column.columnDef.header, header.getContext())
                )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default CustomTableHeader;
