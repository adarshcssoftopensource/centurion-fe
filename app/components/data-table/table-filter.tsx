import { SearchIcon, CircleXIcon } from 'lucide-react';
import { useId, useRef } from 'react';
import { Input } from '../ui/input';
import { cn } from '~/lib/utils';
import type { Table } from '@tanstack/react-table';

interface TableFilterProps<T> {
  table: Table<T>;
}

function TableFilter<T>({ table }: TableFilterProps<T>) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const globalFilter = table.getState().globalFilter as string;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 max-w-[calc(var(--spacing)*75)] w-full">
      <div className="flex items-center gap-3 w-full">
        <div className="relative w-full">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className={cn('peer min-w-60 ps-9', globalFilter && 'pe-9')}
            value={globalFilter ?? ''}
            onChange={(e) => table.setGlobalFilter(e.target.value)} // 🚀 updates as you type
            placeholder="Search..."
            type="text"
            aria-label="Global search"
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3">
            <SearchIcon size={16} />
          </div>
          {globalFilter && (
            <button
              type="button"
              onClick={() => {
                table.setGlobalFilter('');
                inputRef.current?.focus();
              }}
              className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Clear search"
            >
              <CircleXIcon size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TableFilter;
