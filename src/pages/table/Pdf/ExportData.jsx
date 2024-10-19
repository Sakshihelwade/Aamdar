import React, { useEffect, useRef, useState } from "react";
import Select, { components } from "react-select"; import axios from "axios";
import { base_url } from "../../../config/base_url";
import ExportDataTable from "./ExportDataTable";
import Card from "../../../components/ui/Card";

const ExportData = () => {
    const id = localStorage.getItem('_id');
    const [villageId, setVillageId] = useState("");
    const [villageName, setVillageName] = useState("")
    const [villageOption, setVillageOption] = useState([]);
    const [boothNo, setBoothNo] = useState('')
    const [boothOption, setBoothOption] = useState([])
    const [allData, setAllData] = useState([])
    const [total, setTotal] = useState('')
    // console.log(boothNo,"booothno")

    // const handleVillageChange = (e) => {
    //     const selectedValue = e.target.value;
    //     const selectedVillage = villageOption.find(village => village.value === selectedValue);

    //     setVillageId(selectedValue);
    //     setvillageName(selectedVillage ? selectedVillage.label : "");
    // };
    const handleVillageChange = (selectedOption) => {
        setVillageId(selectedOption?.value || "");
        setVillageName(selectedOption?.label || "");
    };
    // console.log(villageName, "nammeee")

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

    const getBoothNo = () => {
        axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
            .then((resp) => {
                const boothNo = resp.data.booths.map((item) => ({
                    label: item.boothNo, value: item.boothNo
                }))
                setBoothOption(boothNo)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getPrintingData = async () => {
        try {
            const response = await axios.get(`${base_url}/print-Report/${id}?boothNo=${boothNo}`)
            console.log(response.data, "print Data")
            setAllData(response.data.voters)
            setTotal(response.data.voters.length);
        } catch (error) {
            console.log(error)
        }
    }
    const clearFields = () => {
        setVillageId("");
        setBoothNo("");
    };


    useEffect(() => {
        getVillageOption();
    }, [])

    useEffect(() => {
        getBoothNo()
    }, [villageId]);

    useEffect(() => {
        getPrintingData()
    }, [boothNo]);

    return (
        <div>
            <div className="mb-4">
                <Card>
                    <div className="mb-2 flex justify-between">
                        <h6 className="font-bold text-[#b91c1c]">Print PDF</h6>
                        <div className="flex gap-6">
                            {/* <h6 className="font-bold text-orange-400 text-lg">महिला:</h6>
                            <h6 className="font-bold text-green-500 text-lg">पुरुष:</h6>
                            <h6 className="font-bold text-blue-400 text-lg">माहित नाही:</h6> */}
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण:{total}</h6>
                        </div>
                    </div>
                    <hr className="mb-3" />
                    <div className="grid grid-cols-4 gap-2">
                        <div>
                            <label className="form-label" htmlFor="mul_1">
                                गाव
                            </label>
                            <Select
                                // isClearable={true}
                                placeholder="गाव"
                                name="गाव"
                                value={villageOption.find(option => option.value === villageId) || null}
                                options={villageOption}
                                onChange={handleVillageChange}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label" htmlFor="mul_1">
                                भाग/बूथ नं
                            </label>
                            <Select
                                // isClearable={true}
                                placeholder="भाग/बूथ नं"
                                name="भाग/बूथ नं"
                                value={boothOption.find(option => option.value === boothNo) || null}
                                options={boothOption}
                                onChange={(selectedOption) => setBoothNo(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <div className="flex justify-end gap-4 items-center mt-1">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                                क्लियर करा
                            </button>
                            <button className="bg-[#1B59F8] text-white py-2 px-10 my-7 rounded-md" onClick={() => window.print()}>
                                Print
                            </button>
                        </div>
                    </div>
                </Card>
            </div>


            <Card >
                <ExportDataTable props={allData} boothNo={boothNo} villageName={villageName} total={total}/>
            </Card>
        </div>
    );
};

export default ExportData;
