// import React, { useState, useMemo, useEffect } from "react";
// import { homeTable } from "../../../constant/table-data";
// import Icon from "../../ui/Icon";
// import Select from "../../ui/Select";
// import {
//   useTable,
//   useRowSelect,
//   useSortBy,
//   useGlobalFilter,
//   usePagination,
// } from "react-table";
// import Modal from "../../ui/Modal";
// import axios from "axios";
// import { base_url } from "../../../config/base_url";
// import InputGroup from "../../ui/Inputgroup";


// const CompanyTable = () => {

//   const COLUMNS = [
//     {
//       Header: "",
//       accessor: "_id",
//       Cell: (row) => {
//         // return <span>{row?.cell?.value}</span>;
//       },
//     },
//     {
//       Header: "नेमलेली गावे",
//       accessor: "villages",
//       Cell: (row) => {
//         const villages = row?.cell?.value;
//         return (
//           <div>
//             {villages.map((village, index) => (
//               <span key={index}>
//                 {index + 1}. {village.villageName}
//                 <br />
//               </span>
//             ))}
//           </div>
//         );
//       },
//     },
//     {
//       Header: "बदल करा",
//       accessor: "",
//       Cell: (row) => {
//         return (
//           <div>
//             <button
//               onClick={() => {
//                 setEditVillageModal(true);
//                 setSelectedUser(row.cell.row.values); // Set the array of columns in selectedUser state
//                 setVillage(row.cell.row.values.villages)
//                 // handleSet(selectedUser);
//               }}
//             >
//               <Icon icon="heroicons:pencil-square" />
//             </button>
//           </div>
//         );
//       },
//     }

//   ];
//   const token = localStorage.getItem('token');
//   const idd = localStorage.getItem('_id');
//   // console.log(id,"iiiiiiiiiiii")
//   const [selectedUserId, setSelectedUserId] = useState('')
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [voterId, setVoterId] = useState('');
//   const [name, setName] = useState('');
//   const [mobile, setMobile] = useState('');
//   const [email, setEmail] = useState('');
//   const [role, setRole] = useState('');
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmpassword, setConfirmPassword] = useState('');
//   const [checked, setChecked] = useState(false);
//   const [village, setVillage] = useState([]);
//   const [showVillageDropdown, setShowVillageDropdown] = useState(false);
//   const [villageOptions, setVillageOptions] = useState([]);
//   const [editVillageModal, setEditVillageModal] = useState(false);
//   const [users, setUsers] = useState([]);
//   const columns = useMemo(() => COLUMNS, []);
//   const data = useMemo(() => users, [users]);
  // const [villageName, setVillageName] = useState('')
  // const [id, setId] = useState('')
//   const toggleDropdown = () => setShowVillageDropdown(!showVillageDropdown);

//   // console.log(selectedUser, "Selected User Data");
//   // console.log(selectedUserId, "naaaaaaaaaaaaame");
//   console.log("village", village);
//   console.log("village option", villageOptions);

//   useEffect(() => {
//     getAllData();
//     getAllVillages();
//   }, [])


//   const getAllData = async () => {
//     try {
//       const response = await axios.get(`${base_url}/api/getAllUser`);
//       console.log(response.data, "responseeeeeeeeee");
//       setUsers(response.data.users)
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const getAllVillages = async () => {
//     try {
//       const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages/${idd}`)
//       setVillageOptions(response.data.village)

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   // const handleVillageChange = (selectedVillage) => {
//   //   // console.log(selectedVillage,"selected villages")
//   //   setId(selectedVillage._id)
//   //   setVillageName(selectedVillage.name)
//   //   const data = {
//   //     id: id,
//   //     villageName: villageName,
//   //   }
//   //   const isAlreadySelected = village.some(v => v._id === data.id);
//   //   if (isAlreadySelected) {
//   //     // Remove the village if it's already selected
//   //     setVillage(village.filter(v => v._id !== data.id));
//   //   } else {
//   //     // Add the village to the selected list
//   //     setVillage([...village, data]);
//   //   }
//   // };
//   const handleVillageChange = (selectedVillage) => {
//     setId(selectedVillage._id);
//     setVillageName(selectedVillage.name);
    
//     // Check if the selected village is already in the village array
//     const isAlreadySelected = village.some(v => v.id === selectedVillage._id);

//     if (isAlreadySelected) {
//         // If it's already selected, remove it from the array
//         setVillage(village.filter(v => v.id !== selectedVillage._id));
//     } else {
//         // If it's not selected, add it to the array
//         const data = {
//             id: selectedVillage._id,
//             villageName: selectedVillage.name,
//         };
//         setVillage([...village, data]);
//     }
// };

//   const tableInstance = useTable(
//     {
//       columns,
//       data,
//       initialState: {
//         pageSize: 6,
//       },
//     },

//     useGlobalFilter,
//     useSortBy,
//     usePagination,
//     useRowSelect
//   );
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     footerGroups,
//     page,
//     nextPage,
//     previousPage,
//     canNextPage,
//     canPreviousPage,
//     pageOptions,
//     state,
//     gotoPage,
//     pageCount,
//     setPageSize,
//     setGlobalFilter,
//     prepareRow,
//   } = tableInstance;

//   const { pageIndex, pageSize } = state;

//   return (
//     <>
//       <div>
//         <div className="overflow-x-auto -mx-6">
//           <div className="inline-block min-w-full align-middle">
//             <div className="overflow-hidden ">
//               <table
//                 className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
//                 {...getTableProps}
//               >
//                 <thead className=" bg-slate-200 dark:bg-slate-700">
//                   {headerGroups.map((headerGroup) => (
//                     <tr {...headerGroup.getHeaderGroupProps()}>
//                       {headerGroup.headers.map((column) => (
//                         <th
//                           {...column.getHeaderProps(
//                             column.getSortByToggleProps()
//                           )}
//                           scope="col"
//                           className=" table-th "
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
//                   {...getTableBodyProps}
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
//         <div className="md:flex md:space-y-0 space-y-5 justify-center mt-6 items-center">
//           <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
//             <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//               <button
//                 className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 onClick={() => previousPage()}
//                 disabled={!canPreviousPage}
//               >
//                 <Icon icon="heroicons-outline:chevron-left" />
//               </button>
//             </li>
//             {pageOptions.map((page, pageIdx) => (
//               <li key={pageIdx}>
//                 <button
//                   href="#"
//                   aria-current="page"
//                   className={` ${pageIdx === pageIndex
//                     ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
//                     : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
//                     }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
//                   onClick={() => gotoPage(pageIdx)}
//                 >
//                   {page + 1}
//                 </button>
//               </li>
//             ))}
//             <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//               <button
//                 className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                 onClick={() => nextPage()}
//                 disabled={!canNextPage}
//               >
//                 <Icon icon="heroicons-outline:chevron-right" />
//               </button>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Edit villages Modal */}
//       <Modal
//         title="नेमलेल्या गावांमध्ये बदल करा"
//         activeModal={editVillageModal} // Ensure this state is being used properly
//         themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
//         onClose={() => setEditVillageModal(false)}
//       >
//         <form className="space-y-5">
//           <div>
//             <label className="block text-gray-700">Select Villages / गाव</label>
//             <div className="relative">
//               <div
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB033] cursor-pointer"
//                 onClick={toggleDropdown}
//               >
//                 {selectedUser?.villages?.length > 0
//                   ? selectedUser.villages.map(v => v.villageName).join(", ")
//                   : "Select villages"}
//               </div>

              // {showVillageDropdown && (
              //   <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              //     {villageOptions.map((villageOption, index) => (
              //       <div key={index} className="p-2">
              //         <label className="flex items-center">
              //           <input
              //             type="checkbox"
              //             checked={village.some(v => v.id === villageOption._id)} // Check if this village is in the selected villages
              //             onChange={() => handleVillageChange(villageOption)}
              //             className="mr-2"
              //           />
              //           {villageOption.name}
              //         </label>
              //       </div>
              //     ))}
              //   </div>
              // )}
//             </div>
//             <p className="text-sm text-gray-600 mt-2">
//               Selected: {village.length > 0 ? village.map(v => v.name).join(", ") : "None"}
//             </p>
//           </div>


//           <div className="flex gap-4 justify-end items-center">
//             <button
//               type="submit"
//               className="btn btn-primary block text-center"
//               onClick={() => updateData}

//             >
//               Update
//             </button>
//             <button
//               type="button"
//               className="btn btn-danger block text-center"
//               onClick={() => { setEditVillageModal(false) }}
//             >
//               Close
//             </button>
//           </div>
//         </form>

//       </Modal>
//     </>
//   );
// };

// export default CompanyTable;


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
      Header: "",
      accessor: "_id",
      Cell: (row) => {
        // return <span>{row?.cell?.value}</span>;
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
      Header: "नेमलेली गावे",
      accessor: "villages",
      Cell: (row) => {
        const villages = row?.cell?.value;
        return (
          <div>
            {villages.map((village, index) => (
              <span key={index}>
                {index + 1}. {village.villageName}
                <br />
              </span>
            ))}
          </div>
        );
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
                setSelectedUserId(row.cell.row.values._id)
                setName(row.cell.row.values.fullName)
                setVoterId(row.cell.row.values.cardNumber)
                setEmail(row.cell.row.values.email)
                setMobile(row.cell.row.values.mobileNumber)
                setRole(row.cell.row.values.role)
                setUserName(row.cell.row.values.userName)
                setVillage(row.cell.row.values.villages)
                // handleSet(selectedUser);
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
    { value: 'Surveyor', label: 'Surveyor' },
    { value: 'Karyakarta', label: 'Karyakarta' },
    // Add other roles as needed
  ];
  const token = localStorage.getItem('token');
  const idd = localStorage.getItem('_id');
  // console.log(id,d"iiiiiiiiiiii")
  const [selectedUserId, setSelectedUserId] = useState('')
  const [selectedUser, setSelectedUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const [village, setVillage] = useState([]);
  const [showVillageDropdown, setShowVillageDropdown] = useState(false);
  const [villageOptions, setVillageOptions] = useState([]);
  const [editVillageModal, setEditVillageModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [villageName, setVillageName] = useState('')
  const [id, setId] = useState('')
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => users, [users]);
  const toggleDropdown = () => setShowVillageDropdown(!showVillageDropdown);
  // console.log(village,"villlllllage")

  useEffect(() => {
    getAllData();
    getAllVillages();
  }, [])

  const getAllData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/getAllUser`);
      // console.log(response.data, "responseeeeeeeeee");

      setUsers(response.data.users)
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVillages = async () => {
    try {
      const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages/${idd}`)
      setVillageOptions(response.data.village)
    } catch (error) {
      console.log(error);
    }
  }

  const updateData = async () => {
    const selectedVillages = village.map(v => ({
      id: v.id,
      villageName: v.villageName,
    }));
    const payload = {
      cardNumber: voterId,
      email: email,
      userName: userId,
      mobileNumber: mobile,
      password: password,
      role: role,
      fullName: name,
      villages: selectedVillages,
    };
    try {
      const response = await axios.post(`${base_url}/api/updateUser/${selectedUserId}`, payload);
      console.log(response.data, "updated Successfully");
      
      toast.success("User updated successfully!"); 
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again."); 
    }
  }

  const handleVillageChange = (selectedVillage) => {
    setId(selectedVillage._id);
    setVillageName(selectedVillage.name);
    // Check if the selected village is already in the village array
    const isAlreadySelected = village.some(v => v.id === selectedVillage._id);

    if (isAlreadySelected) {
        // If it's already selected, remove it from the array
        setVillage(village.filter(v => v.id !== selectedVillage._id));
    } else {
        // If it's not selected, add it to the array
        const data = {
            id: selectedVillage._id,
            villageName: selectedVillage.name,
        };
        setVillage([...village, data]);
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
              <label htmlFor="role" className="block text-gray-700">
                Role / पद
              </label>
              <select
                id="role"
                name="role"
                className="w-full border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-2 focus:ring-[#FFB033]"
              // value={role}

              >
                {Roleoptions.map((item) => {
                  return (
                    <><option value={role} onChange={(selectedRole) => setRole(selectedRole)}>{item.label}</option></>
                  )
                })}

              </select>
            </div>
          </div>
{/* 
          <div>
            <label className="block text-gray-700">Select Villages / गाव</label>
            <div className="relative">
              <div
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB033] cursor-pointer"
                onClick={toggleDropdown}
              >
                {selectedUser?.villages?.length > 0
                  ? selectedUser.villages.map(v => v.villageName).join(", ")
                  : "Select villages"}
              </div>
     
              {showVillageDropdown && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
                  {villageOptions.map((villageOption, index) => (
                    <div key={index} className="p-2">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={village.some(v => v.id === villageOption._id)} // Check if this village is in the selected villages
                          onChange={() => handleVillageChange(villageOption)}
                          className="mr-2"
                        />
                        {villageOption.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Selected: {village.length > 0 ? village.map(v => v.villageName).join(", ") : "None"}
            </p>
          </div> */}
            <div>
    <label className="block text-gray-700">Select Villages / गाव</label>
    <div className="relative">
      <div
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB033] cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedUser?.villages?.length > 0 ? selectedUser?.villages.map(v => v.villageName).join(", ") : "Select villages"}
      </div>

      {showVillageDropdown && (
        <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {villageOptions.map((village, index) => (
            <div key={index} className="p-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={villages.some((v) => v._id === village._id)}
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
      Selected: {villages.length > 0 ? villages.map(v => v.name).join(", ") : "None"}
    </p>
  </div>



          <div className="flex gap-4 justify-end items-center">
            <button
              type="submit"
              className="btn btn-primary block text-center"
              onClick={() => updateData}
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