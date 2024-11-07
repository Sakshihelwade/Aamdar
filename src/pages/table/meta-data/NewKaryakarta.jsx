import React, { useState, useMemo, useEffect } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import GlobalFilter from "../react-tables/GlobalFilter";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import Modal from "../../../components/ui/Modal";
import Inputgroup from "../../../components/ui/InputGroup"
import { toast } from "react-toastify";
import { useStepContext } from "@mui/material";
import SeleteFamilyMemberTable from "../react-tables/SelcteFamilyMemberTable";
import KaryakartaAssignVoter from "./KaryakartaAssignVoter";
import KaryakartaVoterList from "./KaryakartaVoterList";


const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <input
                type="checkbox"
                ref={resolvedRef}
                {...rest}
                className="table-checkbox"
            />
        );
    }
);

const NewKaryakarta = ({ title = "कार्यकर्ता" }) => {

    const COLUMNS = [
       
        {
            Header: "नाव",
            accessor: "fullName",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "गाव",
            accessor: "village",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "मोबाईल नं",
            accessor: "mobileNumber",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
     
        {
            Header: "कृती",
            accessor: "action",
            Cell: (row) => {
                return (
                    <div className="flex space-x-3 rtl:space-x-reverse">
                        <Tooltip content="View" placement="top" arrow animation="shift-away">
                            <button className="action-btn" type="button" onClick={() => {
                                setSelectedRow(row?.cell?.row?.original)
                                setViewKaryakartaModal(true)
                            }}>
                                <Icon icon="heroicons:eye" />
                            </button>
                        </Tooltip>

                        {/* <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                            <button
                                className="action-btn"
                                type="button"
                                onClick={() => {
                                    setEditCasteModal(true);
                                    setCastId(row.cell.row.original._id);
                                    setCast(row.cell.row.original.castname);
                                }}
                            >
                                <Icon icon="heroicons:pencil-square" />
                            </button>
                        </Tooltip> */}

                        {/* <Tooltip content="हटवा" placement="top" arrow animation="shift-away" theme="danger">
                            <button
                                className="action-btn"
                                type="button"
                                onClick={() => {
                                    setCastId(row.cell.row.original._id);
                                    setIsOpen(true);
                                }}
                            >
                                <Icon icon="heroicons:trash" />
                            </button>
                        </Tooltip> */}
                    </div>
                );
            },
        },

    ];
    const columns = useMemo(() => COLUMNS, []);
   
    const [karyakarta,setKaryakarta]=useState([])
    const data = useMemo(() => karyakarta, [karyakarta]);
    const [editCasteModal, setEditCasteModal] = useState(false)
    const [viewKaryakartaModal, setViewKaryakartaModal] = useState(false)
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [selecteVoter, setSelectedVoter] = useState()
    const [activeModal, setActiveModal] = useState(false);
    const [allVoter, setAllVoter] = useState([])
    const familyMember = [...(selectedRowData?.namesOfMembers || []), ...data];
    const token=localStorage.getItem('token')
    const [addCasteModal, stAddCastModal] = useState(false)
    const [cast, setCast] = useState('')
    const [name, setName] = useState("");
    const [village, setVillage] = useState ("")
    const [mobileNo, setMobileNo] =useState ("")
    const [castId, setCastId] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRow, setSelectedRow]= useState("")
    const [selectedFilter,setSelectedFilter]=useState({})
   
    const idArray = selecteVoter?.map(voter => voter._id);

const handleSelectedFiler = (val)=>{
    setSelectedFilter(val)
}

    const handelSetData = (value) => {
        setSelectedVoter(value)
    }

    const handleFamilyModal = (val) => {
        setActiveModal(val)
    }

    const getKaryakartaOption = () => {
        axios.get(`${base_url}/api/get-All-karykarte`)
          .then((resp) => {
            setKaryakarta(resp.data.users)
          })
          .catch((error) => {
            console.log(error)
          })
      }

const addKaryakarta=()=>{
    const payload={
         fullName:name,
         address:village,
         userName:name,
         password:"",
        mobileNumber:mobileNo,
        loginRights:false
    }
    axios.post(`${base_url}/api/addUser`,payload,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    .then((resp)=>{
        stAddCastModal(false)
        setMobileNo('')
        setName('')
        setVillage('')
        getKaryakartaOption()
     toast.success('Karyakarta Add Successfully')
    })
    .catch((error)=>{
        console.log(error)
    })
}

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
        setGlobalFilter,
        prepareRow,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;




    const handleClose = () => {
        setEditCasteModal(false),
            setCast("")
    }


    const handleRowClick = (row) => {
        setSelectedRowData(row?.original);
       setActiveModal(true);
    };

    useEffect(() => {
      
        getKaryakartaOption()
    }, []);

    return (
        <Card>
            <h4 className="card-title">{title}</h4>
            <div className="md:flex justify-end gap-4 items-center mb-6">
                <div>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </div>
                <div>
                    <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md " onClick={() => stAddCastModal(true)}>
                        नवीन कार्यकर्ता जोडा
                    </button>
                </div>

            </div>
            <div className="overflow-x-auto -mx-6">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                    <table {...getTableProps()} className="w-full bg-white border border-gray-200">
                <thead className="bg-slate-200">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} className="bg-gray-200 text-gray-600 text-sm leading-normal">
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-1 py-2 border border-gray-300">
                          {column.render("Header")}
                          <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()} className="text-gray-600 text-sm font-light">
                  {page.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="cursor-pointer  border-b border-gray-200 hover:bg-gray-100" 
                      onClick={()=>setSelectedRowData(row?.original)}
                      onDoubleClick={() => handleRowClick(row)}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()} className="px-1 py-2 border border-gray-300">
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
            <div className="md:flex justify-between items-center mt-6">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <select
                        className="form-control py-2 w-max"
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                    >
                        {[10, 25, 50].map((pageSize) => (
                            <option key={pageSize} value={pageSize}>
                                Show {pageSize}
                            </option>
                        ))}
                    </select>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Page {pageIndex + 1} of {pageOptions.length}
                    </span>
                </div>
                <ul className="flex items-center space-x-3 rtl:space-x-reverse">
                    <li>
                        <button
                            className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            <Icon icon="heroicons:chevron-double-left-solid" />
                        </button>
                    </li>
                    <li>
                        <button
                            className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={previousPage}
                            disabled={!canPreviousPage}
                        >
                            Prev
                        </button>
                    </li>
                    {pageOptions.map((_, pageIdx) => (
                        <li key={pageIdx}>
                            <button
                                className={`${pageIdx === pageIndex
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-100 text-slate-900"
                                    } text-sm rounded h-6 w-6`}
                                onClick={() => gotoPage(pageIdx)}
                            >
                                {pageIdx + 1}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button
                            className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                            onClick={nextPage}
                            disabled={!canNextPage}
                        >
                            Next
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                            className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            <Icon icon="heroicons:chevron-double-right-solid" />
                        </button>
                    </li>
                </ul>
            </div>
            <Modal
                title="संपादित करा"
                activeModal={editCasteModal}
                className="max-w-xl"
                onClose={handleClose}
            >
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 ">
                    <div>
                        <Inputgroup
                            type="text"
                            label="जात"
                            id="जात"
                            placeholder="जात"
                            value={cast}
                            onChange={(e) => setCast(e.target.value)}
                        // isClearable={true} // Uncomment if you want to allow clearing the input
                        />
                    </div>
                    <div className="flex justify-end items-end my-3">
                        <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" >
                            समाविष्ट करा
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Confirmation Modal should be outside of the table */}
            <Modal
                activeModal={isOpen}
                onClose={() => setIsOpen(false)}
                title="हटवण्याची पुष्टी"
            >
                <div className="flex flex-col justify-center items-center">
                    <p className="text-xl font-semibold text-center">तुम्ही खरंच हटवू इच्छिता का?</p>
                    <div className="mt-4"> {/* Add margin to separate text from buttons */}
                        <button className="bg-red-500 text-white px-4 py-2 mr-2" >
                            होय
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2" onClick={() => setIsOpen(false)}>
                            नाही
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Add karyakarta modal */}
            <Modal
                title="कार्यकर्ता "
                activeModal={addCasteModal}
                className="max-w-xl"
                // themeClass="bg-[#b91c1c]"
                onClose={() => stAddCastModal(false)}
            >
                <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 ">
                    <div>
                        <Inputgroup
                            type="text"
                            label="नाव"
                            id="नाव"
                            placeholder="नाव"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Inputgroup
                            type="text"
                            label="गाव"
                            id="गाव"
                            placeholder="गाव"
                            value={village}
                            onChange={(e) => setVillage(e.target.value)}
                        />
                        <Inputgroup
                            type="text"
                            label="मोबाईल नं	"
                            id="मोबाईल नं	"
                            placeholder="मोबाईल नं	"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end items-end my-3">
                        <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md " onClick={addKaryakarta}>
                            समाविष्ट करा
                        </button>
                    </div>
                </div>
            </Modal>


            {/* Add Karyakarta Voter */}
            <Modal
                title="कार्यकर्ता "
                activeModal={activeModal}
               
                className='w-full'
                // themeClass="bg-[#b91c1c]"
                onClose={() => setActiveModal(false)}
            >
                <KaryakartaAssignVoter handelSetData={handelSetData} handleFamilyModal={handleFamilyModal} familyMember={familyMember} handleSelectedFiler={handleSelectedFiler} selectedRowData={selectedRowData}/>
            </Modal>

            <Modal
                title="तपशील पहा"
                activeModal={viewKaryakartaModal}
                className="className='w-full'"
                onClose={()=>setViewKaryakartaModal(false)}
            >
<KaryakartaVoterList selectedRowData={selectedRowData}/>
            </Modal>
        </Card>
    );
};

export default NewKaryakarta;