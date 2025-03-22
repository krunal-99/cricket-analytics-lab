import React, { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: string;
    render?: (item: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "ascending" | "descending";
  }>({
    key: null,
    direction: "ascending",
  });

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction: direction as "ascending" | "descending" });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div className={cn("table-container", className)}>
      <table className="neo-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => column.sortable && requestSort(column.key)}
                className={cn(
                  column.sortable && "cursor-pointer hover:bg-neo-cream"
                )}
              >
                <div className="flex items-center justify-between">
                  <span>{column.header}</span>
                  {column.sortable && sortConfig.key === column.key && (
                    <span>
                      {sortConfig.direction === "ascending" ? (
                        <ArrowUp className="h-4 w-4" />
                      ) : (
                        <ArrowDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                  {column.sortable && sortConfig.key !== column.key && (
                    <SlidersHorizontal className="h-4 w-4 opacity-30" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr
              key={index}
              onClick={() => onRowClick && onRowClick(item)}
              className={onRowClick ? "cursor-pointer" : ""}
            >
              {columns.map((column) => (
                <td key={`${index}-${column.key}`}>
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
          {sortedData.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="text-center py-10">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
