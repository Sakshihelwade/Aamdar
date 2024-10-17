import React, { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import { toast } from "react-toastify";
import CommonTableAddressWise from "./CommonTableAddressWise";

const FamilyWise = () => {
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");
  const [fromList, setFromList] = useState("");
  const [toList, setToList] = useState("");
  const [gender, setGender] = useState("");
  const [allVoter,setAllVoter]=useState([])
  const [voterCount,setVoterCount]=useState()
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption,setBoothOption]=useState([])
  const [currentPage, setCurrentPage] = useState(1);

  
  const SerachBy = [
    { label: "पुरुष", value: "पुरुष" },
    { label: "महिला", value: "महिला" },
    
  ];

  const handleClear = () => {
    setVillageId("");
    setVillageName("");
    setBoothNo("");
    setFromList('')
    setToList('')
    setGender('')
    getAllVoters()
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleVillageChange = (e) => {
    const selectedOption = villageOption.find(option => option.value === e.target.value);
    setVillageId(e.target.value); 
    setVillageName(selectedOption?.label || ""); 
  };

  const getVillageOption = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages`)
      .then((resp) => {
        const villageoption = resp.data.village.map((item) => ({
          label: item.name,
          value: item._id
        }));
        setVillageOption(villageoption);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBoothNo=()=>{
    axios.get(`${base_url}/api/surve/getSortBooth?villageId=${villageId}`)
    .then((resp)=>{
        const boothNo=resp.data.booths.map((item)=>({
            label:item.boothNo , value:item.boothNo
        }))
        setBoothOption(boothNo)

    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const getAllVoters = () => {
    axios
      .get(`${base_url}/api/surve/searchVotter?name=true&boothNo=${boothNo}&village=${villageName}&minBooth=${fromList}&maxBooth=${toList}&gender=${gender}&page=${currentPage}`)
      .then((resp) => {
        setAllVoter(resp.data.voters);
        setVoterCount(resp.data);
        // toast.success('Filter Sucessfully')
      })
      .catch((error) => {
        console.log(error);
        toast.warning('No results found for the provided search criteria')
      });
  };
 

  useEffect(() => {
    getVillageOption();
    getBoothNo()
    }, []);

 useEffect(()=>{
    getBoothNo()
 },[villageName])

useEffect(()=>{
  getAllVoters()
},[currentPage,villageName,boothNo,fromList,toList,gender])

  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">कुटुंबानुसार यादी</h6>
            <p className=" flex gap-6">
                            <h6 className="font-bold text-[#b91c1c] text-lg">महिला  :  {voterCount?.total}</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">पुरुष  :  {voterCount?.total}</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">माहित नाही  :  {voterCount?.total}</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
                        </p>
          </div>
          <hr className="py-2" />
          <p className=" text-[#b91c1c]">
            <span className="font-bold ">विधानसभा</span> :
            <span className="font-bold text-lg">199</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
            <Select
              label="गाव"
              className="w-full"
              placeholder="गाव"
              value={villageId}
              options={villageOption}
              onChange={handleVillageChange} 
            />
            <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              options={boothOption}
              onChange={(e) =>setBoothNo(e.target.value)}
              value={boothNo}
            />
            <InputGroup
              type="text"
              label="यादी नं. पासून"
              id="ps-1"
              placeholder="यादी नं. पासून"
              value={fromList}
              onChange={(e) => setFromList(e.target.value)}
            />
            <InputGroup
              type="text"
              label="यादी नं. पर्यंत"
              id="ps-1"
              placeholder="यादी नं. पर्यंत "
              value={toList}
              onChange={(e) => setToList(e.target.value)}
            />
           
            <Select
              label="लिंग"
              className="w-full"
              placeholder="लिंग"
              options={SerachBy}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
           
            <div className="flex justify-end items-center mt-6">
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </Card>
      </div>
      <Card>
 
  <CommonTable  Props={allVoter} voterCount={voterCount}  currentPage={currentPage} 
  setCurrentPage={setCurrentPage} onPageChange={handlePageChange}/>
      </Card>
    </div>
  );
};

export default FamilyWise;
