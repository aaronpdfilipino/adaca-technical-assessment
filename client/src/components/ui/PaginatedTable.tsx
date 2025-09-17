import { useState, useMemo } from 'react';
import Button from './Button';

type PaginatedTableProps<T extends object> = {
  data: T[];
  searchKey: keyof T;
  columns: { key: keyof T; label: string }[];
  pageSize?: number;
};

export default function PaginatedTable<T extends object>({
  data,
  searchKey,
  columns,
  pageSize = 5,
}: PaginatedTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [searchKeyDynamic, setSearchKeyDynamic] = useState<keyof T>(searchKey);

  const filtered = useMemo(() => {
    return data.filter((row) =>
      String(row[searchKeyDynamic]).toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search, searchKeyDynamic]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex gap-2">
        {/* Select column */}
        <select
          value={String(searchKeyDynamic)}
          onChange={(e) => setSearchKeyDynamic(e.target.value as keyof T)}
          className="rounded border px-2 py-2"
        >
          {columns.map((col) => (
            <option key={String(col.key)} value={String(col.key)}>
              {col.label}
            </option>
          ))}
        </select>

        {/* Input */}
        <input
          type="text"
          placeholder={`Search...`}
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={String(col.key)} className="border-b px-4 py-2 font-medium">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              <>
                {paginated.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    {columns.map((col) => (
                      <td key={String(col.key)} className="border-b px-4 py-2">
                        {String(row[col.key])}
                      </td>
                    ))}
                  </tr>
                ))}
                {paginated.length < pageSize &&
                  new Array(pageSize - paginated.length).fill(null).map((_, i) => (
                    <tr key={paginated.length + 1 + i} className="bg-gray-200">
                      <td className="border-b py-2" colSpan={columns.length}>
                        &nbsp;
                      </td>
                    </tr>
                  ))}
              </>
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center text-gray-500">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="rounded bg-gray-200"
        >
          Prev
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages || totalPages === 0}
          className="rounded bg-gray-200"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
