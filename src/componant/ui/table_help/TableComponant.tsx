import React from 'react';
import Image from 'next/image';
import { HeaderGroup, Row, Cell, TableBodyPropGetter, TablePropGetter } from 'react-table';

type Column = {
    id: string;
    Header: string;
    getHeaderProps: () => any;
    isSorted?: boolean;
    isSortedDesc?: boolean;
    render: (type: 'Header' | 'Cell') => React.ReactNode;
};

type TableComponentProps = {
    getTableProps: () => any;
    getTableBodyProps: () => any;
    headerGroups: HeaderGroup<any>[];
    page: Row<any>[];
    prepareRow: (row: Row<any>) => void;
    handleSort: (column: Column) => void;
};

const TableComponent: React.FC<TableComponentProps> = ({
    getTableProps,
    getTableBodyProps,
    headerGroups = [],
    page = [],
    prepareRow = () => { },
    handleSort = () => { },
}) => {
    // Fallback image handling must use a state variable for Next/Image
    const fallbackImage = '/icons/company.svg';

    const backendUrl = process.env.NEXT_PUBLIC_LOCAL_API_URL;

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-hidden shadow-md sm:rounded-lg">
                        <table className="min-w-full" {...getTableProps()}>
                            <thead className="bg-gray-800 text-white">
                                {headerGroups.map((headerGroup) => (
                                    <tr
                                        {...headerGroup.getHeaderGroupProps()}
                                        key={headerGroup.id}
                                    >
                                        {headerGroup.headers.map((column: any) => (
                                            <th
                                                {...column.getHeaderProps()}
                                                onClick={() => handleSort(column)}
                                                scope="col"
                                                className="text-sm font-medium text-white px-6 py-4 text-left"
                                                key={column.id}
                                            >
                                                {column.render('Header')}
                                                <span>
                                                    {column.isSorted
                                                        ? column.isSortedDesc
                                                            ? ' 🔽'
                                                            : ' 🔼'
                                                        : ''}
                                                </span>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {page.map((row) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            className="odd:bg-gray-100 even:bg-white"
                                            {...row.getRowProps()}
                                            key={row.id}
                                        >
                                            {row.cells?.map((cell: Cell<any>) => {
                                                const header = cell?.column?.Header;
                                                const headerText = typeof header === 'string' ? header.toLowerCase() : '';

                                                const isImageColumn = ['image', 'banner', 'cover', 'thumbnail', 'profile', 'icon'].includes(headerText);
                                                return (
                                                    <td
                                                        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                                                        {...cell.getCellProps()}
                                                        key={cell.column.id}
                                                    >
                                                        {isImageColumn ? (
                                                            <Image
                                                                src={cell.value ? `${backendUrl}${cell.value}` : fallbackImage}
                                                                alt="Media"
                                                                className="w-16 h-16 object-cover rounded-full"
                                                                onError={(e) => {
                                                                    // @ts-ignore: This hack is needed because Next/Image doesn't support onError directly
                                                                    e.target.src = fallbackImage;
                                                                }}
                                                                width={80}
                                                                height={80}
                                                            />
                                                        ) : (
                                                            cell.render('Cell')
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TableComponent;
