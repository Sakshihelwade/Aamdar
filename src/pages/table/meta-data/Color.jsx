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

const Color = ({ title = "रंग" }) => {

    const COLUMNS = [
        {
            Header: "अ.नं.",
            accessor: "srNo",
            Cell: ({ row }) => {
                return <span>{row.index + 1}</span>;
            },
        },
        // {
        //     Header: "Id",
        //     accessor: "_id",
        //     Cell: (row) => {
        //         return <span>{row?.cell?.value}</span>;
        //     },
        // },
        {
            Header: "नाव",
            accessor: "color",
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
                        <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                            <button
                                className="action-btn"
                                type="button"
                                onClick={() => {
                                    setEditCasteModal(true);
                                    setCastId(row.cell.row.original._id);
                                    setCast(row.cell.row.original.color);
                                }}
                            >
                                <Icon icon="heroicons:pencil-square" />
                            </button>
                        </Tooltip>

                        <Tooltip content="हटवा" placement="top" arrow animation="shift-away" theme="danger">
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
                        </Tooltip>
                    </div>
                );
            },
        },

    ];
    const columns = useMemo(() => COLUMNS, []);
    const [casteMeta, setCasteMeta] = useState([]);
    const data = useMemo(() => casteMeta, [casteMeta]);
    const [editCasteModal, setEditCasteModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [addCasteModal, stAddCastModal] = useState(false)
    const [cast, setCast] = useState("");
    const [castId, setCastId] = useState("")
    const [isOpen, setIsOpen] = useState(false);
    // const [castName, setCastName]= useState("")
    // console.log(cast)

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

    const getCaste = () => {
        axios
            .get(`${base_url}/get-colour`)
            .then((resp) => {
                setCasteMeta(resp.data.data);
                console.log(resp.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const addCast = async () => {
        const payload = {
            color: cast
        }
        console.log(payload)
        try {
            const resp = await axios.post(`${base_url}/insert-colour`, payload)
            console.log(resp.data)
            toast.success("समाविष्ट केले")
            stAddCastModal(false)
            setCast('')
            getCaste();
        } catch (error) {
            console.log(error)
            toast.error("पुन्हा प्रयत्न करा")
        }
    }

    const editCast = async () => {
        const payload = {
            color: cast
        }
        try {
            const resp = await axios.post(`${base_url}/updateColor/${castId}`, payload)
            console.log(resp.data)
            toast.success("यशस्वीरित्या अद्यतनित केले")
            handleClose()
            getCaste()
        } catch (error) {
            console.log(error)
            toast.error("पुन्हा प्रयत्न करा")
        }
    }

    const deleteCast = async () => {
        try {
            await axios.post(`${base_url}/deleteColor/${castId}`);
            toast.success("यशस्वीरित्या हटवले");
            getCaste();
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error("काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा");
        }
        finally {
            setIsOpen(false);
        }
    };

    const handleClose = () => {
        setEditCasteModal(false),
            setCast(" ")
    }

    useEffect(() => {
        getCaste();
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
                        रंग जोडा
                    </button>
                </div>

                {/* Confirmation Modal should be outside of the table */}
                <Modal
                    activeModal={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="हटवण्याची पुष्टी"
                >
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-xl font-semibold text-center">तुम्ही खरंच हटवू इच्छिता का?</p>
                        <div className="mt-4"> {/* Add margin to separate text from buttons */}
                            <button className="bg-red-500 text-white px-4 py-2 mr-2" onClick={deleteCast}>
                                होय
                            </button>
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={() => setIsOpen(false)}>
                                नाही
                            </button>
                        </div>
                    </div>
                </Modal>

                {/* Add cast modal */}
                <Modal
                    title="रंग "
                    activeModal={addCasteModal}
                    className="max-w-xl"
                    // themeClass="bg-[#b91c1c]"
                    onClose={() => stAddCastModal(false)}
                >
                    <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 ">
                        <div>
                            <Inputgroup
                                type="text"
                                label="रंग"
                                id="रंग"
                                placeholder="रंग"
                                value={cast}
                                onChange={(e) => setCast(e.target.value)}
                            // isClearable={true} // Uncomment if you want to allow clearing the input
                            />
                        </div>
                        <div className="flex justify-end items-end my-3">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md " onClick={addCast}>
                                समाविष्ट करा
                            </button>
                        </div>
                    </div>
                </Modal>

            </div>
            <div className="overflow-x-auto -mx-6">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table
                            className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                            {...getTableProps()}
                        >
                            <thead className="bg-slate-200 dark:bg-slate-700">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                {...column.getHeaderProps(column.getSortByToggleProps())}
                                                scope="col"
                                                className="table-th"
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
                            label="रंग"
                            id="रंग"
                            placeholder="रंग"
                            value={cast}
                            onChange={(e) => setCast(e.target.value)}
                        // isClearable={true} // Uncomment if you want to allow clearing the input
                        />
                    </div>
                    <div className="flex justify-end items-end my-3">
                        <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={editCast}>
                            समाविष्ट करा
                        </button>
                    </div>
                </div>
            </Modal>


        </Card>
    );
};

export default Color;