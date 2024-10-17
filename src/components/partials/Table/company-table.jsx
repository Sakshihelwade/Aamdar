import React, { useState, useMemo, useEffect } from "react";
import { homeTable } from "../../../constant/table-data";
import Icon from "../../ui/Icon";
import Select from "../../ui/Select";
import {
  useTable,
  useRowSelect,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Modal from "../../ui/Modal";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import InputGroup from "../../ui/Inputgroup";


const CompanyTable = () => {

  const COLUMNS = [
    {
      Header: "नाव",
      accessor: "fullName",
      Cell: (row) => {
        return (
          <span className="flex items-center">
            <div className="flex-1 text-start">
              <h4 className="text-sm font-medium text-slate-600 whitespace-nowrap">
                {row?.cell?.value}
              </h4>
              {/* <div className="text-xs font-normal text-slate-600 dark:text-slate-400">
                Biffco@example.com
              </div> */}
            </div>
          </span>
        );
      },
    },
    {
      Header: "पद",
      accessor: "role",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "कार्ड नं",
      accessor: "cardNumber",
      Cell: (row) => {
        return <span>{row?.cell?.value}</span>;
      },
    },
    {
      Header: "मोबाईल नं.",
      accessor: "mobileNumber",
      Cell: (row) => {
        return (
          <div className="flex space-x-6 items-center rtl:space-x-reverse">
            <span> {row?.cell?.value}</span>
          </div>
        );
      },
    },
    {
      Header: "ईमेल",
      accessor: "email",
      Cell: (row) => {
        return (
          <div className="flex space-x-6 items-center rtl:space-x-reverse">
            <span> {row?.cell?.value}</span>
          </div>
        );
      },
    },
    {
      Header: "वापरकर्ता",
      accessor: "userName",
      Cell: (row) => {
        return (
          <div className="flex space-x-6 items-center rtl:space-x-reverse">
            <span> {row?.cell?.value}</span>
          </div>
        );
      },
    },
    {
      Header: "नेमलेली गावे",
      accessor: "villages",
      Cell: (row) => {
        const villages = row?.cell?.value;
    
        // Check if the value is an array or a single village
        if (Array.isArray(villages)) {
          return (
            <div>
              {villages.map((village, index) => (
                <span key={index}>
                  {index + 1}. {village}
                  <br />
                </span>
              ))}
            </div>
          );
        } else {
          // For a single village, just display it without numbering
          return <span>{villages}</span>;
        }
      },
    },
    {
      Header: "बदल करा",
      accessor: "",
      Cell: (row) => {
        return (
          <div>
            <button
              onClick={() => {
                setEditVillageModal(true);
                setSelectedUser(row.cell.row.values); // Set the array of columns in selectedUser state
                handleSet();
              }}
            >
              <Icon icon="heroicons:pencil-square" />
            </button>
          </div>
        );
      },
    }

  ];

  const Roleoptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'editor', label: 'Editor' },
    { value: 'viewer', label: 'Viewer' },
    // Add other roles as needed
  ];

  const [selectedUser, setSelectedUser] = useState(null);
  const [voterId, setVoterId] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [villages, setVillages] = useState([]);
  const [showVillageDropdown, setShowVillageDropdown] = useState(false);
  const [villageOptions, setVillageOptions] = useState([]);
  const [editVillageModal, setEditVillageModal] = useState(false);
  const [users, setUsers] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  console.log(name, "mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
  const data = useMemo(() => users, [users]);
  const toggleDropdown = () => setShowVillageDropdown(!showVillageDropdown);

  console.log(selectedUser, "Selected User Data");
  // console.log(name, "naaaaaaaaaaaaame")

  // console.log(name,"nameemmmmm")
  useEffect(() => {
    getAllData();
    getAllVillages();
  }, [])

  const handleSet = () => {
    setVoterId(selectedUser.cardNumber);
    // console.log(selectedUser.cardNumber,"hhhhhhhhhhhhhh")
    setName(selectedUser.fullName);
    setMobile(selectedUser.mobileNumber);
    setUserName(selectedUser.userName)
    setRole(selectedUser.role)
    setEmail(selectedUser.email)
    // console.log(name, "nnnnnnnnnnnnnnnnnnnnn")
  }

  const getAllData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/getAllUser`);
      console.log(response.data, "responseeeeeeeeee");
      setUsers(response.data.users)
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVillages = async () => {
    try {
      const response = await axios.get(`${base_url}/getVillages`)
      setVillageOptions(response.data.villages)
    } catch (error) {
      console.log(error);
    }
  }

  const handleVillageChange = (village) => {
    if (villages.some(v => v._id === village._id)) {
      setVillages(villages.filter((v) => v._id !== village._id));
    } else {
      setVillages([...villages, village]);
    }
  };


  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
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

  const { pageIndex, pageSize } = state;

  return (
    <>
      <div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps}
              >
                <thead className=" bg-slate-200 dark:bg-slate-700">
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
        <div className="md:flex md:space-y-0 space-y-5 justify-center mt-6 items-center">
          <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
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
                  className={` ${pageIdx === pageIndex
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
                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Edit villages Modal */}
      <Modal
        title="नेमलेल्या गावांमध्ये बदल करा"
        activeModal={editVillageModal} // Ensure this state is being used properly
        themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
        onClose={() => setEditVillageModal(false)}
      >
        <form className="space-y-5">
          <div className="grid grid-cols-2 gap-1">

            <div className="mx-2 my-1">
              <label htmlFor="voterId" className="block text-gray-700">Voter ID / ओळखपत्र क्र.</label>
              <input
                id="voterId"
                name="voterId"
                type="text"
                placeholder="Enter your Voter ID"
                value={voterId} // Assuming you have a state for voterId
                onChange={(e) => setVoterId(e.target.value)} // Update state on change
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#FFB033]"
              />
            </div>

            <div className="mx-2 my-1">
              <label htmlFor="name" className="block text-gray-700">Name / नाव</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)} // Update name state on input change
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#FFB033]"
              />
            </div>

            <div className="mx-2 my-1">
              <label htmlFor="mobile" className="block text-gray-700">Mobile / मोबाइल</label>
              <input
                id="mobile"
                name="mobile"
                type="number"
                placeholder="Enter your mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#FFB033]"
              />
            </div>

            <div className="mx-2 my-1">
              <label htmlFor="email" className="block text-gray-700">Email / ईमेल</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#FFB033]"
              />
            </div>

            <div className="mx-2 my-1">
              <label htmlFor="role" className="block text-gray-700">Role / पद</label>
              <select
                id="role"
                name="role"
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#FFB033]"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value={role} disabled>Select Role</option>
                {/* Map over role options here */}
              </select>
            </div>

            <div className="mx-2 my-1">
              <label htmlFor="userName" className="block text-gray-700">UserName / वापरकर्ता</label>
              <input
                id="userName"
                name="userName"
                type="text"
                placeholder="Enter your User ID"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#FFB033]"
              />
            </div>

          </div>

          <div>
            <label className="block text-gray-700">Select Villages / गाव </label>
            <div className="relative">
              <div
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB033] cursor-pointer"
                onClick={toggleDropdown}
              >
                Select villages
              </div>

              {showVillageDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {villageOptions.map((village, index) => (
                    <div key={index} className="p-1">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={villages.some(v => v._id === village._id)}
                          onChange={() => handleVillageChange(village)}
                          className="mr-2"
                        />
                        {village.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {/* Selected: {villages.map(v => v.name).join(", ") || "None"} */}
            </p>
          </div>

          <div className="flex gap-4 justify-end items-center">
            <button
              type="submit"
              className="btn btn-primary block text-center"
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-danger block text-center"
              onClick={() => { setEditVillageModal(false) }}
            >
              Close
            </button>
          </div>
        </form>

      </Modal>
    </>
  );
};

export default CompanyTable;
