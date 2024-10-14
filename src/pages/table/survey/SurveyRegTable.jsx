
    // import React, { useState, useMemo, useEffect } from "react";
    // import Card from "@/components/ui/Card";
    // import Icon from "@/components/ui/Icon";
    // import {
    //   useTable,
    //   useRowSelect,
    //   useSortBy,
    //   useGlobalFilter,
    //   usePagination,
    // } from "react-table";

    // const COLUMNS = [
    //   {
    //     Header: "भाग/बूथ नं",
    //     accessor: "boothNo",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "अ.नं.",
    //     accessor: "serialNo",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "नाव",
    //     accessor: "name",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "वय",
    //     accessor: "age",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "लिंग",
    //     accessor: "gender",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "मोबाईल नं",
    //     accessor: "mobile",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "नवीन पत्ता",
    //     accessor: "currentAddress",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "घर नं",
    //     accessor: "C_HOUSE_NO",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "पत्ता",
    //     accessor: "address",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "कार्ड नं",
    //     accessor: "cardNumber",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "मुळगाव",
    //     accessor: "nativePlace",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    //   {
    //     Header: "स्टेटस",
    //     accessor: "dwetmr",
    //     Cell: (row) => {
    //       return <span>{row?.cell?.value}</span>;
    //     },
    //   },
    // ];
    // const IndeterminateCheckbox = React.forwardRef(
    //   ({ indeterminate, ...rest }, ref) => {
    //     const defaultRef = React.useRef();
    //     const resolvedRef = ref || defaultRef;

    //     React.useEffect(() => {
    //       resolvedRef.current.indeterminate = indeterminate;
    //     }, [resolvedRef, indeterminate]);

    //     return (
    //       <input
    //         type="checkbox"
    //         ref={resolvedRef}
    //         {...rest}
    //         className="table-checkbox"
    //       />
    //     );
    //   }
    // );

    // const CommonTable = ({
    //   title = "",
    //   Props,
    //   voterCount,
    //   currentPage,
    //   setCurrentPage,
    // }) => {
    //   console.log(Props,"1st call in table")
    //   const totalPageCount = Math.ceil(voterCount?.total / 25);
    
    //   const columns = useMemo(() => COLUMNS, []);
    //   // const data = useMemo(() => props, [props]); 
  
    // const [data, setData] = useState(Props); 
    // useEffect(() => {
    //   setData(Props);
    // console.log("//page data set in use effect",data);

      
    // }, [Props]);
    // console.log("Data variabel value",data);
    //   const tableInstance = useTable(
    //     {
    //       columns,
    //       data,
    //       initialState: { pageSize: 25, pageIndex: currentPage - 1 },
    //     },
    //     useGlobalFilter,
    //     useSortBy,
    //     usePagination,
    //     useRowSelect
    //   );

    //   // useEffect(() => {
    //   //   // Recalculate tableInstance whenever data changes
    //   //   tableInstance.setPageSize(25);
    //   // }, [data, currentPage]);

     
    //   const {
    //     getTableProps,
    //     getTableBodyProps,
    //     headerGroups,
    //     page,
    //     canNextPage,
    //     canPreviousPage,
    //     pageOptions,
    //     state,
    //     gotoPage,
    //     setPageSize,
    //     prepareRow,
    //   } = tableInstance;
    //   const { pageIndex, pageSize } = state;

      
      

    //   const handleNextPage = () => {
    //     if (currentPage < totalPageCount) {
    //       setCurrentPage(currentPage + 1);
    //       gotoPage(currentPage); 
    //     }
    //   };
      

    //   const handlePreviousPage = () => {
    //     if (currentPage > 1) {
    //       setCurrentPage(currentPage - 1);
    //       gotoPage(currentPage - 2); 
    //     }
    //   };
      

      
    //   return (
    //     <>
    //       <Card>
    //         <div className="overflow-x-auto -mx-6">
    //           <div className="inline-block min-w-full align-middle">
    //             <div className="overflow-hidden">
    //               <table
    //                 className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
    //                 {...getTableProps()}
    //               >
    //                 <thead className="bg-slate-200 dark:bg-slate-700">
    //                   {headerGroups.map((headerGroup) => (
    //                     <tr {...headerGroup.getHeaderGroupProps()}>
    //                       {headerGroup.headers.map((column) => (
    //                         <th
    //                           {...column.getHeaderProps(
    //                             column.getSortByToggleProps()
    //                           )}
    //                           scope="col"
    //                           className="table-th"
    //                         >
    //                           {column.render("Header")}
    //                           <span>
    //                             {column.isSorted
    //                               ? column.isSortedDesc
    //                                 ? " 🔽"
    //                                 : " 🔼"
    //                               : ""}
    //                           </span>
    //                         </th>
    //                       ))}
    //                     </tr>
    //                   ))}
    //                 </thead>
    //                 <tbody
    //                   className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
    //                   {...getTableBodyProps()}
    //                 >
    //                   {page.map((row) => {
    //                     prepareRow(row);
    //                     return (
    //                       <tr {...row.getRowProps()}>
    //                         {row.cells.map((cell) => {
    //                           return (
    //                             <td {...cell.getCellProps()} className="table-td">
    //                               {cell.render("Cell")}
    //                             </td>
    //                           );
    //                         })}
    //                       </tr>
    //                     );
    //                   })}
    //                 </tbody>
    //               </table>
    //             </div>
    //           </div>
    //         </div>

    //         <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
    //           <div className="flex items-center space-x-3 rtl:space-x-reverse">
    //             <select
    //               className="form-control py-2 w-max"
    //               value={pageSize}
    //               onChange={(e) => setPageSize(Number(e.target.value))}
    //             >
    //               {[25].map((size) => (
    //                 <option key={size} value={size}>
    //                   Show {size}
    //                 </option>
    //               ))}
    //             </select>
    //             <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
    //               Page {currentPage} of {totalPageCount}
    //             </span>
    //           </div>

    //           <ul className="flex items-center space-x-3 rtl:space-x-reverse">
    //             <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
    //               <button
    //                 className={`${
    //                   currentPage == 1
    //                     ? "opacity-50 cursor-not-allowed"
    //                     : ""
    //                 }`}
    //                 onClick={() => {
    //                   setCurrentPage(1);
    //                   gotoPage(0);
    //                 }}
    //                 disabled={currentPage == 1}
    //               >
    //                 <Icon icon="heroicons:chevron-double-left-solid" />
    //               </button>
    //             </li>
    //             <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
    //               <button
    //                 className={`${
    //                   currentPage === 1
    //                     ? "opacity-50 cursor-not-allowed"
    //                     : ""
    //                 }`}
    //                 onClick={handlePreviousPage}
    //                 disabled={currentPage === 1}
    //               >
    //                 Prev
    //               </button>
    //             </li>
    //             {pageOptions.map((pageOption, pageIdx) => (
                  
    //               <li key={pageIdx}>
    //                 <button
    //                   className={`${
    //                     pageIdx == pageIndex
    //                       ? "bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium"
    //                       : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
    //                   } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
    //                   onClick={() => {
    //                     setCurrentPage(pageIdx + 1);
    //                     gotoPage(pageIdx);
    //                   }}
    //                 >
    //                   {pageIdx + 1}
    //                 </button>
    //               </li>
    //             ))}
    //             <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
    //               <button
    //                 className={`${
    //                   currentPage >= totalPageCount
    //                     ? "opacity-50 cursor-not-allowed"
    //                     : ""
    //                 }`}
    //                 onClick={handleNextPage}
    //                 disabled={currentPage >= totalPageCount}

    //               >
    //                 Next
    //               </button>
    //             </li>
    //             <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
    //               <button
    //                 onClick={() => {
    //                   setCurrentPage(totalPageCount);
    //                   gotoPage(totalPageCount - 1);
    //                 }}
    //                 disabled={currentPage >= totalPageCount}
    //                 className={`${
    //                   currentPage >= totalPageCount
    //                     ? "opacity-50 cursor-not-allowed"
    //                     : ""
    //                 }`}
    //               >
    //                 <Icon icon="heroicons:chevron-double-right-solid" />
    //               </button>
    //             </li>
    //           </ul>
    //         </div>
    //       </Card>
    //     </>
    //   );
    // };

    // export default CommonTable;


    import React, { useState, useEffect } from 'react';
// import EditModal from './EditModal';

const SurveyRegTable = ({ Props, onPageChange, voterCount }) => {
  console.log(Props,"//")
  // console.log(voterCount.total)
  const [activeModal, setActiveModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [inputPage, setInputPage] = useState(); 
console.log(currentPage,"/////////")
  const data = Props?.length > 0 ? Props : [];
  const totalPages = Math.ceil(voterCount?.total / rowsPerPage);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = data;

  const ActiveDiactiveModal = (value) => {
    setActiveModal(value);
  };

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange, currentRows]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setInputPage(currentPage - 1); 
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setInputPage(currentPage + 1); 
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setInputPage(1); 
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    setActiveModal(true);
  };

  const handlePageInputChange = (e) => {
    const page = Number(e.target.value);
    if (page > 0 && page <= totalPages) {
      setInputPage(page); 
    }
  };

  const handlePageJump = () => {
    if (inputPage > 0 && inputPage <= totalPages) {
      setCurrentPage(inputPage); 
      setInputPage('')
    }
  };

  return (
    <div className="p-1">
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
              {/* Table Headers */}
              <th className="px-1 py-2 border border-gray-300">नाव</th>
              <th className="px-1 py-2 border border-gray-300">मोबाईल नं</th>
              <th className="px-1 py-2 border border-gray-300">EMEI</th>
              <th className="px-1 py-2 border border-gray-300">Allowed PartID</th>
              <th className="px-1 py-2 border border-gray-300">स्टेटस</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentRows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
                onClick={() => handleRowClick(row)}
              >
                {/* Table Data */}
                <td className="px-1 py-2 border border-gray-300">{row.name}</td>
                <td className="px-1 py-2 border border-gray-300">{row.MOBILE_NO}</td>
                <td className="px-1 py-2 border border-gray-300">{row.address}</td>
                <td className="px-1 py-2 border border-gray-300">{row.address}</td>
                <td className='px-1 py-2 border border-gray-300'>{row.MOBILE_NO}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handlePrevious}
          className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="flex items-center">
  <span>Page No</span>
  <input
    type="text"
    value={inputPage}
    onChange={handlePageInputChange}
    className="border border-gray-300 text-center w-16 mx-2"
  />
  <button
    onClick={handlePageJump}
    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md"
  >
    Go
  </button>
</div>


        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

    
    </div>
  );
};

export default SurveyRegTable;
