import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from "./GlobalFilter";
import { useNavigate } from "react-router-dom";

const COLUMNS = [
  { Header: "पत्ता", accessor: "address" },
  { Header: "पुरुष", accessor: "maleCount" },
  { Header: "स्त्री", accessor: "femaleCount" },
  { Header: "एकून", accessor: "totalCount" },
];

const AddressWiseTable = ({ title = "", Props, handleAddressSelect }) => {
  const columns = useMemo(() => COLUMNS, []);
  const [data, setData] = useState(Props);

  const navigate=useNavigate()

  useEffect(() => {
    setData(Props);
  }, [Props]);

  const tableInstance = useTable(
    { columns, data },
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
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex, pageSize } = state;

  // Pagination button rendering with active page highlighted in gray
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
      <Card>
        {/* <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">{title}</h4>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </div> */}
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table {...getTableProps()} className="min-w-full divide-y divide-slate-100 table-fixed">
                <thead className="bg-slate-200">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="table-th">
                          {column.render("Header")}
                          <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="bg-white divide-y divide-slate-100">
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="cursor-pointer" onClick={() =>{ handleAddressSelect(row.original.address)
                        navigate('/AddressWiseTable2' , { state: { address: row.original.address } })
                       
                      }}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} className="table-td">
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
            onChange={e => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map(size => (
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
      </Card>
    </>
  );
};

export default AddressWiseTable;
