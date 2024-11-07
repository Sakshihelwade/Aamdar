// import React, { useState, useMemo, useEffect } from "react";
// import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
// import Card from "@/components/ui/Card";
// import Icon from "@/components/ui/Icon";

// const COLUMNS = [
//     {
//         Header: "नाव",
//         accessor: "name",
//         Cell: (row) => {
//             return <span>{row?.cell?.value}</span>;
//         },
//     },
//     {
//         Header: "संख्या",
//         accessor: "namesOfMembers.length",
//         Cell: (row) => {
//             return <span>{row?.cell?.value}</span>;
//         }
//     }
//     // Add more columns as needed
// ];

// const FamilyWiseTable = ({ title = "", props, total ,handleDubarVoter}) => {
//     const columns = useMemo(() => COLUMNS, []);
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         setData(props);
//     }, [props]);

//     const tableInstance = useTable(
//         {
//             columns,
//             data,
//         },
//         useGlobalFilter,
//         useSortBy,
//         usePagination,
//         useRowSelect
//     );

//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         page,
//         nextPage,
//         previousPage,
//         canNextPage,
//         canPreviousPage,
//         pageOptions,
//         state,
//         gotoPage,
//         pageCount,
//         setPageSize,
//         prepareRow,
//     } = tableInstance;

//     const { pageIndex, pageSize } = state;

//     // Function to create pagination with ellipsis
//     const renderPageNumbers = () => {
//         const visiblePageCount = 3; // Number of pages to show before/after the current page
//         const totalPages = pageCount;
//         const pages = [];

//         if (totalPages <= 5) {
//             // If total pages are 5 or less, show all
//             for (let i = 0; i < totalPages; i++) {
//                 pages.push(
//                     <li key={i}>
//                         <button
//                             className={` ${i === pageIndex
//                                 ? "bg-slate-900 dark:bg-slate-600 text-white font-medium"
//                                 : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400"
//                                 } text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center`}
//                             onClick={() => gotoPage(i)}
//                         >
//                             {i + 1}
//                         </button>
//                     </li>
//                 );
//             }
//         } else {
//             // If there are more than 5 pages, add ellipsis logic
//             if (pageIndex > visiblePageCount) {
//                 pages.push(
//                     <li key="first">
//                         <button
//                             className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400 text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center"
//                             onClick={() => gotoPage(0)}
//                         >
//                             1
//                         </button>
//                     </li>,
//                     <li key="start-ellipsis">...</li>
//                 );
//             }

//             // Show pages around current page
//             for (let i = Math.max(0, pageIndex - visiblePageCount); i <= Math.min(pageIndex + visiblePageCount, totalPages - 1); i++) {
//                 pages.push(
//                     <li key={i}>
//                         <button
//                             className={` ${i === pageIndex
//                                 ? "bg-slate-900 dark:bg-slate-600 text-white font-medium"
//                                 : "bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400"
//                                 } text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center`}
//                             onClick={() => gotoPage(i)}
//                         >
//                             {i + 1}
//                         </button>
//                     </li>
//                 );
//             }

//             if (pageIndex < totalPages - visiblePageCount - 1) {
//                 pages.push(
//                     <li key="end-ellipsis">...</li>,
//                     <li key="last">
//                         <button
//                             className="bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-400 text-sm rounded leading-[16px] h-6 w-6 flex items-center justify-center"
//                             onClick={() => gotoPage(totalPages - 1)}
//                         >
//                             {totalPages}
//                         </button>
//                     </li>
//                 );
//             }
//         }

//         return pages;
//     };

//     return (
//         <>
         
//             <div className="overflow-x-auto -mx-6 mt-1">
//                 <div className="inline-block min-w-full align-middle">
//                     <div className="overflow-hidden">
//                         <table
//                             className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
//                             {...getTableProps()}
//                         >
//                             <thead className="bg-gray-300 dark:bg-slate-700">
//                                 {headerGroups.map((headerGroup) => (
//                                     <tr {...headerGroup.getHeaderGroupProps()}>
//                                         {headerGroup.headers.map((column) => (
//                                             <th
//                                                 {...column.getHeaderProps(column.getSortByToggleProps())}
//                                                 className="table-th h-[26px]"
//                                             >
//                                                 {column.render("Header")}
//                                                 <span>
//                                                     {column.isSorted
//                                                         ? column.isSortedDesc
//                                                             ? " 🔽"
//                                                             : " 🔼"
//                                                         : ""}
//                                                 </span>
//                                             </th>
//                                         ))}
//                                     </tr>
//                                 ))}
//                             </thead>
//                             <tbody
//                                 className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
//                                 {...getTableBodyProps()}
//                             >
//                                 {page.map((row) => {
//                                     prepareRow(row);
//                                     return (
//                                         <tr
//                                             {...row.getRowProps()}
//                                             onClick={() => handleDubarVoter(row.original)}
//                                             className="cursor-pointer"
//                                         >
//                                             {row.cells.map((cell) => (
//                                                 <td {...cell.getCellProps()} className="table-td py-3">
//                                                     {cell.render("Cell")}
//                                                 </td>
//                                             ))}
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
//                 <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    
//                 </div>
//             </div>

            
//         </>
//     );
// };

// export default FamilyWiseTable;


import React, { useState, useMemo, useEffect } from "react";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

const COLUMNS = [
    {
        Header: "नाव",
        accessor: "name",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        },
    },
    {
        Header: "संख्या",
        accessor: "familyCount",
        Cell: (row) => {
            return <span>{row?.cell?.value}</span>;
        }
    }
    // Add more columns as needed
];

const FamilyWiseTable = ({ title = "", props, total, handleDubarVoter }) => {
    const columns = useMemo(() => COLUMNS, []);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(props);
    }, [props]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
    } = tableInstance;

    const { pageIndex, pageSize } = state;

    // Function to create pagination with ellipsis
    const renderPageNumbers = () => {
        const visiblePages = 5;

        if (pageOptions.length === 0) {
            return null; // No pages available, don't render pagination
        }

        const pageButtons = [];
        let startPage = Math.max(pageIndex - 2, 0);
        let endPage = Math.min(pageIndex + 2, pageOptions.length - 1);

        if (pageIndex <= 2) {
            endPage = visiblePages - 1;
        }
        if (pageIndex >= pageOptions.length - 3) {
            startPage = pageOptions.length - visiblePages;
        }

        // Ensure startPage and endPage are within bounds
        if (startPage < 0) startPage = 0;
        if (endPage >= pageOptions.length) endPage = pageOptions.length - 1;

        if (startPage > 0) {
            pageButtons.push(
                <button key={0} onClick={() => gotoPage(0)} className="pagination-button">
                    1
                </button>,
                <span key="start-ellipsis">...</span>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageButtons.push(
                <button
                    key={i}
                    onClick={() => gotoPage(i)}
                    className={`pagination-button px-2 ${pageIndex === i ? "bg-gray-500 text-white" : ""}`}
                >
                    {i + 1}
                </button>
            );
        }

        if (endPage < pageOptions.length - 1) {
            pageButtons.push(
                <span key="end-ellipsis">...</span>,
                <button
                    key={pageOptions.length - 1}
                    onClick={() => gotoPage(pageOptions.length - 1)}
                    className="pagination-button"
                >
                    {pageOptions.length}
                </button>
            );
        }

        return pageButtons;
    };

    return (
        <>
            {/* <Card> */}
                <div className="overflow-x-auto -mx-6 mt-1">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps()}
                            >
                                <thead className="bg-gray-300 dark:bg-slate-700">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    className="table-th h-[26px]"
                                                >
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? " 🔽"
                                                                : " 🔼"
                                                            : ""}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps()}
                                >
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                onClick={() => handleDubarVoter(row.original)}
                                                className="cursor-pointer"
                                            >
                                                {row.cells.map((cell) => (
                                                    <td {...cell.getCellProps()} className="table-td py-3">
                                                        {cell.render("Cell")}
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="md:flex justify-between mt-6 items-center">
                    <select
                        className="form-control py-2 w-max"
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[10, 25,50].map((size) => (
                            <option key={size} value={size}>
                                Show {size}
                            </option>
                        ))}
                    </select>
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                            className={`pagination-button ${!canPreviousPage ? "disabled" : ""}`}
                        >
                            Prev
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                            className={`pagination-button ${!canNextPage ? "disabled" : ""}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            {/* </Card> */}
        </>
    );
};

export default FamilyWiseTable;
