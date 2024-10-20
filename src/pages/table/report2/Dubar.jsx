import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import DubarTable1 from "./DubarTable1";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import DubarTable2 from "./DubarTable2";

const Dubar = () => {
    const id = localStorage.getItem('_id');
    const [allVoter, setAllVoter] = useState('')
    const [voterCount, setVoterCount] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [dubarVoter, setDubarVoter] = useState([])
    const [dubarVoterCount, setDubarVoterCount] = useState([])
    const [selectedDubar, setSelectedDubar] = useState()
    const [boothNo, setBoothNo] = useState("")
    const [villageName, setVillageName] = useState("")
    const [villageId, setVillageId] = useState("")
    const [boothOptions, setBoothOptions] = useState([])
    const [villageOptions, setVillageOptions] = useState([])
    console.log(voterCount,"hiiiiiiiiiiiiiii")
    const totalmalefemale=voterCount?.maleCount + voterCount?.femaleCount
  const other=voterCount?.total - totalmalefemale || 0
  console.log(dubarVoter,"respppppppppppppppppppppp")
    // console.log(boothOptions, "opppppppp")
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getAllVillages()
    }, [])

    useEffect(() => {
        getAllBooth()
    }, [villageId])

    const getAllVoters = () => {
        axios.get(`${base_url}/api/surve/searchVotter/${id}?nameDuplicate=${selectedDubar?.name}`)
            .then((resp) => {
                // console.log(resp.data,"mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm")
                setAllVoter(resp.data.voters);
                setVoterCount(resp.data);
                // toast.success('Filter Sucessfully')
            })
            .catch((error) => {
                console.log(error);
                // toast.warning('No results found for the provided search criteria')
            });
    };

    const getDubarVoter = () => {
        axios.get(`${base_url}/api/surve/searchVotter/${id}?duplicateNamesWeb=true&page=${currentPage}`)
            .then((resp) => {
                setDubarVoter(resp?.data.data)
                setDubarVoterCount(resp.data)
            })
            // console.log(,"resppppppppppp")
            .catch((error) => {
                console.log(error)
            })
    }

    const getAllVillages = async () => {
        try {
            const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`);
            console.log(response.data, "villages response"); // Log the entire response
            const villages = response.data.village?.map((item) => ({
                label: item.name,
                value: item._id,
            }));
            setVillageOptions(villages);
        } catch (error) {
            console.log(error);
        }
    };


    const getAllBooth = async () => {
        try {
            const resp = await axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`);
            console.log(resp.data, "boothno");
            const booths = resp.data.booths?.map((item) => ({
                label: item.boothNo,
                value: item.boothNo,
            }));
            setBoothOptions(booths);
        } catch (error) {
            console.log(error);
        }
    }


    const handleDubarVoter = (voter) => {
        setSelectedDubar(voter)
    }

    const handleVillageChange = (e) => {
        const selectedOption = villageOptions.find(option => option.value === e.target.value);
        setVillageId(e.target.value);
        setVillageName(selectedOption?.label || "");
    };

    useEffect(() => {
        getAllVoters()
    }, [currentPage, selectedDubar])

    useEffect(() => {
        getDubarVoter()
    }, [])

    const clearFields =()=>{
        setBoothNo('');
        setVillageId('');
        setVillageName('');
        getDubarVoter();
    }
    return (
        <div>
            <div className=" mb-4">
                <Card>
                    <div className="mb-2 flex  justify-between">
                        <h6 className="font-bold text-[#b91c1c]">दुबार </h6>
                        <p className=" flex gap-6">
                            {/* <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
                            <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
                            <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6> */}
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
                        </p>
                    </div>
                    <hr className="py-2" />
                    <p>
                        <span className="font-bold">विधानसभा</span>{" "}
                        <span className="font-bold text-lg">199</span>
                    </p>
                    {/* <div className="grid grid-cols-4 gap-2">
                        <Select
                            label="गाव"
                            className="w-full"
                            placeholder="गाव"
                            value={villageId}
                            options={villageOptions}
                            onChange={handleVillageChange}
                        />

                        <Select
                            label="भाग/बूथ नं"
                            className="w-full"
                            placeholder="भाग/बूथ नं"
                            value={boothNo}
                            options={boothOptions}
                            onChange={(e) => setBoothNo(e.target.value)} 
                        />
                        <span></span>
                       
                    </div> */}
                    {/* <div className="flex justify-end gap-4 items-center mt-6">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                                क्लियर करा
                            </button>
                        </div> */}
                </Card>
            </div>
            <Card>
                <div className=" grid grid-cols-12">
                    <div className="col-span-4 mx-4">
                        <DubarTable1 Props={dubarVoter} voterCount={dubarVoterCount} handleDubarVoter={handleDubarVoter} />
                    </div>
                    <div className="col-span-8 mx-4">
                        <DubarTable2 Props={allVoter} voterCount={voterCount}
                            onPageChange={handlePageChange} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dubar;
