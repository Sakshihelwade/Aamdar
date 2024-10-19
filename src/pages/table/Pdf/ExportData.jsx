import React, { useEffect, useRef, useState } from "react";
import Select from "../../../components/ui/Select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import Card from "../../../components/ui/Card";
import ReactToPrint from 'react-to-print';
import ExportDataTable from "./ExportDataTable";

const ExportData = () => {
    const id = localStorage.getItem('_id');
    const [villageId, setVillageId] = useState("");
    const [villageOption, setVillageOption] = useState([]);
    const printRef = useRef();

    useEffect(() => {
        getVillageOption();
    }, []);

    const handleVillageChange = (e) => {
        setVillageId(e.target.value);
    };

    const getVillageOption = () => {
        axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
            .then((resp) => {
                const villageOptions = resp.data.village?.map((item) => ({
                    label: item?.name,
                    value: item?._id
                }));
                setVillageOption(villageOptions);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const clearFields = () => {
        setVillageId("");
    };

    return (
        <div>
            <div className="mb-4">
                <Card>
                    <div className="mb-2 flex justify-between">
                        <h6 className="font-bold text-[#b91c1c]">रेड / ग्रीन मतदार</h6>
                        <div className="flex gap-6">
                            <h6 className="font-bold text-orange-400 text-lg">महिला:</h6>
                            <h6 className="font-bold text-green-500 text-lg">पुरुष:</h6>
                            <h6 className="font-bold text-blue-400 text-lg">माहित नाही:</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण:</h6>
                        </div>
                    </div>
                    <hr className="mb-3" />
                    <div className="grid grid-cols-4 gap-2">
                        <Select
                            label="गाव"
                            className="w-full"
                            placeholder="गाव"
                            value={villageId}
                            options={villageOption}
                            onChange={handleVillageChange}
                        />
                        <div className="flex justify-end gap-4 items-center mt-6">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md">
                                क्लियर करा
                            </button>
                            <ReactToPrint
                                trigger={() => <button className="bg-[#1B59F8] text-white py-2 px-10 my-7 rounded-md">Print</button>}
                                content={() => printRef.current}
                                pageStyle="@media print { .page-break { page-break-before: always; } }"
                            />
                        </div>
                    </div>
                </Card>
            </div>

            <Card ref={printRef}>
                <ExportDataTable/>
            </Card>
        </div>
    );
};

export default ExportData;
