import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import ExportDataTable from "./ExportDataTable";
import Card from "../../../components/ui/Card";
import InputGroup from "../../../components/ui/InputGroup"; // Assuming you have this component for input fields
import { toast } from "react-toastify";

const ExportData = () => {
    const id = localStorage.getItem('_id');
    const [villageId, setVillageId] = useState("");
    const [villageName, setVillageName] = useState("");
    const [villageOption, setVillageOption] = useState([]);
    const [boothNo, setBoothNo] = useState("");
    const [boothOption, setBoothOption] = useState([]);
    const [allData, setAllData] = useState([]);
    const [total, setTotal] = useState('');
    const [srNo, setSrNo] = useState('');
    const [voterName, setVoterName] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [fromList, setFromList] = useState('');
    const [toList, setToList] = useState('');
    const [fromAge, setFromAge] = useState('');
    const [toAge, setToAge] = useState('');
    const [gender, setGender] = useState('');
    const [caste, setCaste] = useState('');
    const [color, setColor] = useState('');
    const [karyakartaName, setKaryakartaName] = useState('');
    const [status, setStatus] = useState('');
    const [casteOption, setCastOption] = useState([])
    const [colorOptions, setColorOptions] = useState([])
    const [userOptions, setUserOptions] = useState([])
    const printRef = useRef();

    const SerachBy = [
        { label: 'पुरुष', value: 'पुरुष' },
        { label: 'महिला', value: 'महिला' },
        { label: 'माहित नाही', value: 'माहित नाही' },
    ];

    const statusOptions = [
        { label: 'जिवंत', value: 'Alive' },
        { label: 'मृत', value: 'Dead' }
    ];

    const handleVillageChange = (selectedOption) => {
        setVillageId(selectedOption?.value || "");
        setVillageName(selectedOption?.label || "");
        setBoothNo('')
        
    };

    const handleKaryakartaChange = (selectedOption) => {
        setKaryakartaName(selectedOption?.value || "");
    };

    const handleSelectChange = (selectedOption) => {
        setColor(selectedOption?.value || "");
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

    const getBoothNo = () => {
        axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
            .then((resp) => {
                const boothNo = resp.data.booths.map((item) => ({
                    label: item.boothNo, value: item.boothNo
                }))
                setBoothOption(boothNo);
                console.log(resp.data, "boothno")
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getPrintingData = async () => {
        try {
            const response = await axios.get(`${base_url}/api/surve/searchVotter/${id}?printOut=true&name=true&boothNo=${boothNo}&village=${villageName}&serialNo=${srNo}&nameFilter=${voterName}&cardNumber=${cardNo}&minBooth=${fromList}&maxBooth=${toList}&minAge=${fromAge}&maxAge=${toAge}&gender=${gender}&caste=${caste}&colour=${color}&aliveOrDead=${status}`);
            console.log(response.data, "print Data");
            setAllData(response.data.voters);
            setTotal(response.data.voters.length);
        } catch (error) {
            console.log(error);
            toast.error("आपण एका वेळी फक्त 5000 नोंदी छापू शकता.")
        }
    };

    const getCasteOption = () => {
        axios.get(`${base_url}/getCastMeta`)
            .then((resp) => {
                const casteOption = resp.data.data?.map((item) => ({
                    label: item?.castname,
                    value: item?._id,
                }));
                setCastOption(casteOption);

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getColor = () => {
        axios
            .get(`${base_url}/get-colour`)
            .then((resp) => {
                const colors = resp.data.data?.map((item) => ({
                    label: item?.color,
                    value: item?._id,
                }));
                setColorOptions(colors);
                console.log(resp.data)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUsers = async () => {
        try {
            const response = await axios.get(`${base_url}/api/get-All-karykarte`);
            const users = response.data?.users.map((item) => ({
                label: item?.fullName,
                value: item?._id,
            }));
            setUserOptions(users)
        } catch (error) {
            console.log(error);
        }
    };

    const clearFields = () => {
        setVillageId("");
        setBoothNo("");
        setAllData([]);
        setSrNo('');
        setVoterName('');
        setCardNo('');
        setFromList('');
        setToList('');
        setFromAge('');
        setToAge('');
        setGender('');
        setCaste('');
        setColor('');
        setKaryakartaName('');
        setStatus('');
        setVillageName('');
        setTotal(0);
    };

    useEffect(() => {
        getVillageOption();
    }, []);

    useEffect(() => {
        getBoothNo();
    }, [villageId]);

    const isAnyFieldSelected = () => {
        return (
            villageId || boothNo || srNo || voterName || cardNo || fromList || toList ||
            fromAge || toAge || gender || caste || color || karyakartaName || status
        );
    };

    useEffect(() => {
        if (isAnyFieldSelected()) {
            getPrintingData();
        }
    }, [boothNo, srNo, voterName, fromList, toList, fromAge, toAge, gender, caste, color, status, cardNo, villageName]);

    useEffect(() => {
        getCasteOption();
    }, []);

    useEffect(() => {
        getColor();
    }, []);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <div className="mb-4">
                <Card>
                    <div className="mb-2 flex justify-between">
                        <h6 className="font-bold text-[#b91c1c]" onClick={window.print}>Print PDF</h6>
                        <div className="flex gap-6">
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण: {total}</h6>
                        </div>
                    </div>
                    <hr className="mb-3" />
                    <div className="grid grid-cols-5 gap-2">
                        <div>
                            <label className="form-label">गाव</label>
                            <Select
                                placeholder="गाव"
                                value={villageOption.find(option => option.value === villageId) || null}
                                options={villageOption}
                                onChange={handleVillageChange}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">भाग/बूथ नं</label>
                            <Select
                                placeholder="भाग/बूथ नं"
                                value={boothOption.find(option => option.value === boothNo) || null}
                                options={boothOption}
                                onChange={(selectedOption) => setBoothNo(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <InputGroup
                            type="text"
                            label="अ.क्र."
                            placeholder="अ.क्र."
                            value={srNo}
                            onChange={(e) => setSrNo(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="मतदाराचे नाव"
                            placeholder="मतदाराचे नाव"
                            value={voterName}
                            onChange={(e) => setVoterName(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="EPIC/कार्ड नं"
                            placeholder="EPIC/कार्ड नं"
                            value={cardNo}
                            onChange={(e) => setCardNo(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="यादी नं. पासून"
                            placeholder="यादी नं. पासून"
                            value={fromList}
                            onChange={(e) => setFromList(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="यादी नं. पर्यंत"
                            placeholder="यादी नं. पर्यंत"
                            value={toList}
                            onChange={(e) => setToList(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="वयापासून"
                            placeholder="वयापासून"
                            value={fromAge}
                            onChange={(e) => setFromAge(e.target.value)}
                        />

                        <InputGroup
                            type="text"
                            label="वयापर्यंत"
                            placeholder="वयापर्यंत"
                            value={toAge}
                            onChange={(e) => setToAge(e.target.value)}
                        />

                        <div>
                            <label className="form-label">लिंग</label>
                            <Select
                                placeholder="लिंग"
                                value={SerachBy.find(option => option.value === gender) || null}
                                options={SerachBy}
                                onChange={(selectedOption) => setGender(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">जात</label>
                            <Select
                                placeholder="जात"
                                value={casteOption.find(option => option.value === caste) || null}
                                options={casteOption}
                                onChange={(selectedOption) => setCaste(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">कलर</label>
                            <Select
                                placeholder="कलर"
                                value={colorOptions.find(option => option.value === color) || null}
                                options={colorOptions}
                                onChange={handleSelectChange}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">कायकर्ता नाव</label>
                            <Select
                                placeholder="कायकर्ता नाव"
                                value={userOptions.find(option => option.value === karyakartaName) || null}
                                options={userOptions}
                                onChange={handleKaryakartaChange}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>

                        <div>
                            <label className="form-label">स्थिती</label>
                            <Select
                                placeholder="स्थिती"
                                value={statusOptions.find(option => option.value === status) || null}
                                options={statusOptions}
                                onChange={(selectedOption) => setStatus(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <div className="flex justify-evenly mt-8">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                                Clear
                            </button>
                            <button className='bg-[#b91c1c] text-white px-5 h-10 rounded-md' onClick={window.print}>
                                Print
                            </button>
                        </div>
                    </div>
                </Card>
            </div>

            <div>
                <div className="p-1" id='print-content' ref={printRef}>
                    <div className='text-center py-2 mt-5 mb-3 font-semibold'>
                        <p> गाव : {villageName} &nbsp;&nbsp;&nbsp; भाग/बूथ नं : {boothNo}  &nbsp;&nbsp;&nbsp; एकूण : {total}</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border border-gray-200">
                            <thead>
                                <tr className="bg-gray-300 text-gray-600 text-sm leading-normal">
                                    {/* Table Headers */}
                                    <th className="px-1 py-2 border border-gray-300">भाग/बूथ नं</th>
                                    <th className="px-1 py-2 border border-gray-300">अ.नं.</th>
                                    <th className="px-1 py-2 border border-gray-300">नाव</th>
                                    <th className="px-1 py-2 border border-gray-300">वय</th>
                                    <th className="px-1 py-2 border border-gray-300">लिंग</th>
                                    <th className="px-1 py-2 border border-gray-300">मोबाईल नं</th>
                                    <th className="px-1 py-2 border border-gray-300">नवीन पत्ता</th>
                                    <th className="px-1 py-2 border border-gray-300">घर नं</th>
                                    <th className="px-1 py-2 border border-gray-300">पत्ता</th>
                                    <th className="px-1 py-2 border border-gray-300">कार्ड नं</th>
                                    <th className="px-1 py-2 border border-gray-300">मुळगाव</th>
                                    <th className="px-1 py-2 border border-gray-300">स्टेटस</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {allData?.map((item, index) => {
                                    return (
                                        <>
                                            <tr className={`odd:bg-gray-100 even:bg-white`} key={index}>
                                                {/* Table Data */}
                                                <td className="px-1 py-2 border border-gray-300">{item?.boothNo}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.serialNo}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.name}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.age}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.gender}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.mobile}</td>
                                                <td className="px-1 py-2 border border-gray-300"></td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.houseNo}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.address}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.cardNumber}</td>
                                                <td className="px-1 py-2 border border-gray-300">{item?.nativePlace}</td>
                                                <td className="px-1 py-2 border border-gray-300"></td>
                                            </tr>
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Print Styles */}
                <style>
                    {`
          @media print {
              body * {
                  visibility: hidden;
              }
              #print-content, #print-content * {
                  visibility: visible;
              }
              #print-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100vw;
              }
          }
        `}
                </style>
            </div>
        </div>
    );
};

export default ExportData;
