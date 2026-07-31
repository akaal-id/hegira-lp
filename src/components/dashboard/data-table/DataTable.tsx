"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import styles from "./DataTable.module.css";

export interface DataTableColumn<T> {
  header: string;
  accessor: (item: T) => ReactNode;
}

export interface DataTableFilterConfig<T> {
  key: string;
  label: string;
  options: { label: string; value: string }[];
  predicate: (item: T, value: string) => boolean;
}

export interface DataTableSortOption<T> {
  label: string;
  value: string;
  compare: (a: T, b: T) => number;
}

interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  renderMobileCard: (item: T) => ReactNode;
  searchPredicate?: (item: T, query: string) => boolean;
  filtersConfig?: DataTableFilterConfig<T>[];
  sortOptions?: DataTableSortOption<T>[];
  itemsPerPage?: number;
  emptyStateMessage?: string;
}

export default function DataTable<T>({
  data,
  columns,
  renderMobileCard,
  searchPredicate,
  filtersConfig = [],
  sortOptions = [],
  itemsPerPage = 5,
  emptyStateMessage = "No matching data.",
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortValue, setSortValue] = useState(sortOptions[0]?.value ?? "");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let rows = data;

    if (search && searchPredicate) {
      rows = rows.filter((item) => searchPredicate(item, search));
    }

    filtersConfig.forEach((filter) => {
      const value = filters[filter.key];
      if (value) {
        rows = rows.filter((item) => filter.predicate(item, value));
      }
    });

    const activeSort = sortOptions.find((option) => option.value === sortValue);
    if (activeSort) {
      rows = [...rows].sort(activeSort.compare);
    }

    return rows;
  }, [data, search, searchPredicate, filters, filtersConfig, sortValue, sortOptions]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const pageRows = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        {searchPredicate && (
          <div className={styles.searchField}>
            <Search size={15} className={styles.searchIcon} />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search…"
              className={styles.searchInput}
            />
          </div>
        )}

        {filtersConfig.map((filter) => (
          <div key={filter.key} className={styles.selectField}>
            <select
              value={filters[filter.key] ?? ""}
              onChange={(e) => handleFilterChange(filter.key, e.target.value)}
              aria-label={filter.label}
              className={styles.select}
            >
              <option value="">{filter.label}</option>
              {filter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.selectIcon} />
          </div>
        ))}

        {sortOptions.length > 0 && (
          <div className={styles.selectField}>
            <select
              value={sortValue}
              onChange={(e) => {
                setSortValue(e.target.value);
                setPage(1);
              }}
              aria-label="Sort"
              className={styles.select}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className={styles.selectIcon} />
          </div>
        )}
      </div>

      <div className={styles.mobileList}>
        {pageRows.length > 0 ? (
          pageRows.map((item, index) => <div key={index}>{renderMobileCard(item)}</div>)
        ) : (
          <p className={styles.empty}>{emptyStateMessage}</p>
        )}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.header} scope="col" className={styles.th}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.length > 0 ? (
              pageRows.map((item, index) => (
                <tr key={index} className={styles.row}>
                  {columns.map((col) => (
                    <td key={col.header} className={styles.td}>
                      {col.accessor(item)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className={styles.emptyCell}>
                  {emptyStateMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <span className={styles.pageInfo}>
          Page {currentPage} of {totalPages} · {filtered.length} items
        </span>
        <div className={styles.pageButtons}>
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={styles.pageButton}
            aria-label="Previous page"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={styles.pageButton}
            aria-label="Next page"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
