'use client';
import React, { useMemo, useState } from "react";
import {
    useTable,
    useColumnOrder,
    useSortBy,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useFilters,
    TableInstance,
    HeaderGroup,
    Row,
    Column,
} from "react-table";
import { GlobalFilter } from "./table_help/GlobalFilter";
import { ColumnFilter } from "./table_help/ColumnFilter";
import PaginationBar from "./table_help/PaginationBar";
import TableComponent from "./table_help/TableComponant";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Define the prop types for the table
export interface CustomPaginationTableProps<T extends object> {
    paginationPage: number;
    pageCount: number;
    onPageChange: (page: number) => void;
    limit: number;
    onLimitChange: (limit: number) => void;
    columns: Column<T>[];
    data: T[];
    sortDirection: "asc" | "desc";
    setSortDirection: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
    addNewButton?: boolean | { label?: string };
    showViewAction?: boolean;
    showEditAction?: boolean;
    showDeleteAction?: boolean;
    handleView?: (row: T) => void;
    handleDelete?: (id: string | number) => void;
    editPath?: string;
    onSearch: (searchValue: string) => void;
    path: string;
    showStatus?: boolean;
}

const CustomPaginationTable = <T extends { id?: string | number } = any>({
    paginationPage,
    pageCount,
    onPageChange,
    limit,
    onLimitChange,
    columns,
    data,
    sortDirection,
    setSortDirection,
    addNewButton = true,
    showViewAction = false,
    showEditAction = false,
    showDeleteAction = false,
    handleView,
    handleDelete,
    editPath = "",
    onSearch,
    path,
    showStatus = true,
}: CustomPaginationTableProps<T>) => {
    const defaultColumn = useMemo(
        () => ({
            Filter: ColumnFilter,
        }),
        []
    );
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname()

    // Search handler
    const handleSearch = (searchValue: string) => {
        if (searchValue !== searchTerm) {
            setSearchTerm(searchValue);
            onPageChange(1);
            gotoPage(0);
        }
        onSearch(searchValue);
    };

    // Page size change handler
    const handleChangePagePerView = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        onLimitChange(Number(e.target.value));
        onPageChange(1);
        gotoPage(0);
    };

    // Memoize columns with serial and action columns
    const memoizedColumns = useMemo(() => {
        const serialColumn: Column<T> = {
            id: "serial",
            Header: "",
            Cell: ({ row }: { row: Row<T> }) => (
                <span>{row.index + 1 + (paginationPage - 1) * limit}</span>
            ),
        };
        const actionColumn: Column<T> = {
            id: "actions",
            Header: "Actions",
            Cell: ({ row }: { row: Row<T> }) => (
                <div className="flex space-x-2">
                    {showViewAction && handleView && (
                        <button
                            onClick={() => handleView(row.original)}
                            className="text-black hover:text-green-500 font-bold py-1 px-2 rounded text-xs"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                        </button>
                    )}
                    {showEditAction && editPath && (
                        <Link href={`${editPath}/${row.original.id}/edit`}>
                            <button className="text-black hover:text-blue-500 font-bold py-1 px-2 rounded text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>
                            </button>
                        </Link>
                    )}
                    {showDeleteAction && handleDelete && (
                        <button
                            onClick={() => row.original.id && handleDelete(row.original.id)}
                            className="text-black hover:text-red-500 font-bold py-1 px-2 rounded text-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                    )}
                </div>
            ),
        };
        return [
            serialColumn,
            ...columns,
            ...(showViewAction || showEditAction || showDeleteAction ? [actionColumn] : []),
        ].filter(Boolean) as Column<T>[];
    }, [columns, showViewAction, showEditAction, showDeleteAction, handleView, handleDelete, editPath, paginationPage, limit]);

    // Table instance
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // @ts-ignore: page and gotoPage are added by usePagination
        page,
        prepareRow,
        state,
        // @ts-ignore: page and gotoPage are added by usePagination
        gotoPage,
    } = useTable<T>(
        {
            columns: memoizedColumns,
            data,
            initialState: {
                pageIndex: paginationPage - 1 as number,
                pageSize: limit as number,
            } as Partial<any>, // react-table v7 expects Partial<TableState<T>> but pageIndex/pageSize are not in the base type
            manualPagination: true,
            pageCount,
            // @ts-ignore: defaultColumn is not fully typed in react-table v7
            defaultColumn,
        },
        useColumnOrder,
        useGlobalFilter,
        useFilters,
        useSortBy,
        usePagination,
        useRowSelect
    );

    // Sorting handler
    const handleSort = (column: any) => {
        setSortDirection((prevDirection) => (prevDirection === "desc" ? "asc" : "desc"));
        column.toggleSortBy(sortDirection === "desc", false);
    };

    // Pagination handlers
    const handlePageChange = (newPage: number) => {
        onPageChange(newPage);
        gotoPage(newPage - 1);
    };
    const handlePreviousPage = () => {
        if (paginationPage > 1) {
            onPageChange(paginationPage - 1);
        }
    };
    const handleNextPage = () => {
        if (paginationPage < pageCount) {
            onPageChange(paginationPage + 1);
        }
    };

    // Add New button label
    const addNewLabel = typeof addNewButton === "object" && addNewButton.label ? addNewButton.label : "Add New";

    return (
        <>
            <h3 className="font-bold text-2xl">{path.toUpperCase()}</h3>
            <div className="lg:flex justify-between items-center">
                <GlobalFilter onSearch={handleSearch} />
                <div className="md:flex gap-1 lg:gap-3 justify-center items-center">
                    <div className="text-center">
                        {addNewButton && (
                            <Link href={`${pathname}/new`} className="ml-2 mt-2 lg:ml-3 bg-black hover:bg-green-700 text-white font-bold py-1 px-2 lg:px-4 rounded">
                                {addNewLabel}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <TableComponent
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups as HeaderGroup<T>[]}
                page={page as Row<T>[]}
                prepareRow={prepareRow}
                handleSort={handleSort}
            />
            <PaginationBar
                pageCount={pageCount}
                pageIndex={paginationPage - 1}
                gotoPage={(page) => handlePageChange(page + 1)}
                previousPage={handlePreviousPage}
                nextPage={handleNextPage}
                canPreviousPage={paginationPage > 1}
                canNextPage={paginationPage < pageCount}
                pageSize={limit}
                handleChangePagePerView={handleChangePagePerView}
            />
        </>
    );
};

export default CustomPaginationTable;