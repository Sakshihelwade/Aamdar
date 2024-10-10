import React, { useState, useMemo, useEffect } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";
import Select from "../../../components/ui/Select";


import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
// import ModalPage from "../../components/modal";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button"; 
import ToasterComponent from "../../components/ToasterComponent";
import axios from "axios";



const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input
          type="checkbox"
          ref={resolvedRef}
          {...rest}
          className="table-checkbox"
        />
      </>
    );
  }
);

const ExamapleOne = () => {
  const actions = [
    {
      name: "view",
      icon: "heroicons-outline:eye",
      action: (row)=>handleActions(row?.cell?.row?.original)
    },
    {
      name: "edit",
      icon: "heroicons:pencil-square",
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
    },
  ];

  const COLUMNS = [
    // {
    //   Header: "Id",
    //   accessor: "id",
    //   Cell: (row) => {
    //     return <span>{row?.cell?.value}</span>;
    //   },
    // },
    // {
    //   Header: "Order",
    //   accessor: "order",
    //   Cell: (row) => {
    //     return <span>#{row?.cell?.value}</span>;
    //   },
    // },
    {
      Header: "Vendor Name",
      accessor: `firstName`,
      Cell: (row) => {
        return (
          <div>
            <span className="inline-flex items-center">
              <span className="w-7 h-7 rounded-full ltr:mr-3 rtl:ml-3 flex-none bg-slate-600">
                <img
                  src="https://png.pngtree.com/png-vector/20220709/ourmid/pngtree-businessman-user-avatar-wearing-suit-with-red-tie-png-image_5809521.png"
                  alt=""
                  className="object-cover w-full h-full rounded-full"
                />
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
                {row?.cell?.value}
              </span>
            </span>
          </div>
        );
      },
    },
    {
      Header: "Email",
      accessor: "email",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Mobile Number",
      accessor: "mobileNumber",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "Category",
      accessor: "serviceDetails.category",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "status",
      accessor: "isVerified",
      Cell: (row) => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value === true
                  ? "text-success-500 bg-success-500"
                  : ""
              } 
              ${
                row?.cell?.value === false
                  ? "text-warning-500 bg-warning-500"
                  : ""
              }
              ${
                row?.cell?.value === "cancled"
                  ? "text-danger-500 bg-danger-500"
                  : ""
              }
              
               `}
            >
              {row?.cell?.value  ? "Verified" : "Not Verified"}
            </span>
          </span>
        );
      },
    },
    {
      Header: "action",
      accessor: "action",
      Cell: (row) => {
        return (
          <div>
            <Dropdown
              classMenuItems="right-0 w-[140px] top-[110%] "
              label={
                <span className="text-xl text-center block w-full">
                  <Icon icon="heroicons-outline:dots-vertical" />
                </span>
              }
            >
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {actions.map((item, i) => (
                  <Menu.Item key={i}>
                    <div
                      className={`
                  
                    ${
                      item.name === "delete"
                        ? "bg-danger-500 text-danger-500 bg-opacity-30   hover:bg-opacity-100 hover:text-white"
                        : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                    }
                     w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm  last:mb-0 cursor-pointer 
                     first:rounded-t last:rounded-b flex  space-x-2 items-center rtl:space-x-reverse `}
                      onClick={() => item.action && item.action(row)}
                    >
                      <span className="text-base">
                        <Icon icon={item.icon} />
                      </span>
                      <span>{item.name}</span>
                    </div>
                  </Menu.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const [vendorList, setVendorList] = useState([]);
  const data = useMemo(() => vendorList, [vendorList]);
  const [type, setType] = useState("");
  const [activeModal, setActiveModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus,setSelectedStatus] = useState("")

  const statusOptions = [
    "Verified","Not Verified"
  ]

  const getData = () => {
    axios.get(`https://apis.demandtokaro.com/vendors/getAllFormVendors?category=${selectedCategory}&status=${selectedStatus}`)
    .then((response) =>{
      setVendorList(response.data)
      // setSelectedCategory("")
      // setSelectedStatus("")
    })
    .catch((error) => {
      console.log(error);
    })
  };

  const handleActions = (item) => {
    // console.log(item)
    // setType(item.name)
    setSelectedItem(item);
    setActiveModal(true);
  };

  const handleStatus = (item) => {
    axios.patch(`https://apis.demandtokaro.com/admin/verifyVendor/${item._id}`,{isVerified:!item.isVerified})
    .then((response) => {
      setActiveModal(false)
      toast.success("Status updated successfully...")
      // console.log(resp);
      getData();
    })
    .catch((error) => {
      console.log(error)
    })
  };
  const tableInstance = useTable(
    {
      columns,
      data,
    },

    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,

    // (hooks) => {
    //   hooks.visibleColumns.push((columns) => [
    //     {
    //       id: "selection",
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ]);
    // }
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
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

  const getCategories = () => {
    axios.get(`https://apis.demandtokaro.com/service/getServices`)
    .then(response => {
      const list = response.data.map((item) =>  item.title)
      setCategories(list)
    })
    .catch(error => console.error(error))
  }


  useEffect(() => {
    getData();
    getCategories()
  }, [selectedCategory,selectedStatus]);
  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Vendor List</h4>

          <div className="flex justify-between gap-4 items-center flex-wrap">
            <Select placeholder={"Select Category"} options={categories} value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}/>
            <Select placeholder={"Select Status"} options={statusOptions} value={selectedStatus} onChange={(e)=>setSelectedStatus(e.target.value)}/>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className=" table-th "
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
                  {...getTableBodyProps}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()} className="table-td">
                              {cell.render("Cell")}
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
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                  type="number"
                  className=" form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
              <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
          </div>
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((page, pageIdx) => (
              <li key={pageIdx}>
                <button
                  href="#"
                  aria-current="page"
                  className={` ${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                  }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {page + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
      <Modal
        activeModal={activeModal}
        onClose={() => setActiveModal(false)}
        title="Vendor Profile"
      >
        <div className="p-4 text-left">
          <div className="bg-gray-200 p-4 rounded-md">
          <h4 className="text-2xl font-semibold text-gray-700 underline mb-3 text-center">
              Personal Details
            </h4>
            <h6 className="text-lg font-semibold text-gray-700 mb-3">
              Name: {selectedItem?.firstName}
            </h6>
            <h6 className="text-lg font-semibold text-gray-700 mb-3">
              Email: {selectedItem?.email}
            </h6>
            <h6 className="text-lg font-semibold text-gray-700 mb-3">
              Mobile No.: {selectedItem?.mobileNumber}
            </h6>
            <h6 className="text-lg font-semibold text-gray-700 mb-3">
              Address: {selectedItem?.address?.street || "street"}, {selectedItem?.address?.city || "city"},  {selectedItem?.address?.state || "state"}, {selectedItem?.address?.pincode || "pincode"}
            </h6>
          </div>
          <div className="border-b border-gray-300 my-4"></div>
          <div className="text-base text-gray-600 dark:text-gray-300 bg-gray-200 p-4 rounded-md text-center">
            <h4 className="text-2xl font-semibold text-gray-700 underline mb-3">
              Business Details
            </h4>
            <h6 className="mb-4 text-left">
              Category : {selectedItem?.serviceDetails?.category}
            </h6>
            {selectedItem && (
              <div className="">
                <h5 className="text-xl font-semibold text-gray-700 mb-3 text-left">
                  Working Locations
                </h5>
                <ol>
                  {selectedItem?.serviceDetails?.location?.map(
                    (location, index) => (
                      <li key={index} className="bg-slate-50 p-3 rounded-md mt-1 mb-1" >
                        <div className="mb-4 text-left">
                          <p className="text-gray-700">
                            Description: {location?.location?.description}
                          </p>
                          <p className="text-gray-700">
                            Pincode: {location?.pincode}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ol>
              </div>
            )}
            <button
              className="mt-4 text-white bg-green-500 py-2 px-4 rounded-md hover:bg-green-400 focus:outline-none"
              disabled={selectedItem?.status === true}
              onClick={() =>{ handleStatus(selectedItem);}}
            >
              Verify Status
            </button>
          </div>
        </div>
      </Modal>
      <ToasterComponent />
    </>
  );
};

export default ExamapleOne;
