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
import ThreeDotMenu from "./ThreeDotMenu";

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
    addNewButtonComponent?: React.ReactNode;
    showViewAction?: boolean;
    showEditAction?: boolean;
    showDeleteAction?: boolean;
    handleView?: (row: T) => void;
    handleDelete?: (id: string | number) => void;
    handleEdit?: (row: T) => void;
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
    addNewButtonComponent,
    showViewAction = false,
    showEditAction = false,
    showDeleteAction = false,
    handleView,
    handleDelete,
    handleEdit,
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
        // const serialColumn: Column<T> = {
        //     id: "serial",
        //     Header: "",
        //     Cell: ({ row }: { row: Row<T> }) => (
        //         <span>{row.index + 1 + (paginationPage - 1) * limit}</span>
        //     ),
        // };
        const actionColumn: Column<T> = {
            id: "actions",
            Header: "Actions",
            Cell: ({ row }: { row: Row<T> }) => (
                <div className="flex space-x-2">
                    {showViewAction && handleView && (
                        <button
                            onClick={() => handleView(row.original)}
                            className="text-gray-600 text-sm font-medium border border-gray-200 bg-transparent hover:bg-gray-300 px-3 py-2 rounded-lg"
                        >
                            View
                        </button>
                    )}
                    <ThreeDotMenu
                        handleView={handleView}
                        handleDelete={handleDelete}
                        row={row.original as T}
                        id={row.original.id}
                    />
                </div>
            ),
        };
        return [
            // serialColumn,
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

            <div className="grid grid-cols-2 justify-between items-center  px-3">
                <div className="flex gap-3 items-center">
                    <h3 className="font-semibold text-xl">{path}</h3>
                    <GlobalFilter onSearch={handleSearch} />
                </div>
                <div className="text-center justify-self-end">
                    {addNewButtonComponent !== undefined && addNewButtonComponent !== null ? (
                        addNewButtonComponent
                    ) : addNewButton ? (
                        <Link href={`${pathname}/new`} className="text-sm text-white bg-[#7856FC] hover:bg-[#6941C6] p-3 rounded-lg">
                            {addNewLabel}
                        </Link>
                    ) : null}
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