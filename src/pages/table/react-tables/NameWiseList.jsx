import React, { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
// import Select from "@/components/ui/Select";
import Select, { components } from "react-select";

import axios from "axios";
import { base_url } from "../../../config/base_url";
import { toast } from "react-toastify";

import NameWiseCommonTable from "./NameWiseCommonTable";


const NameWiseList = () => {
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");
  const [srNo, setSrNo] = useState("");
  const [voterName, setVoterName] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [relative, setRelative] = useState("");
  const [relativeName, setRelativeName] = useState("");
  const [allVoter, setAllVoter] = useState([])
  const [voterCount, setVoterCount] = useState()
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption, setBoothOption] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  console.log(voterCount)

  const SerachBy = [
    { label: "आडनावानुसार", value: "आडनावानुसार" },
    { label: "वडिलांचे नाव", value: "वडिलांचे नाव" },
    { label: "आईचे नाव", value: "आईचे नाव" },
    { label: "पतीचे नाव", value: "पतीचे नाव" },
    { label: "इतर", value: "इतर" },
  ];

  const handleClear = () => {
    setVillageId("");
    setVillageName("");
    setBoothNo("");
    setSrNo("");
    setVoterName("");
    setCardNo("");
    setRelative("");
    setRelativeName("");
    setCurrentPage(1); // Optionally reset to the first page
    setAllVoter([]); // Optionally clear voter data
    setVoterCount({}); // Optionally reset voter count
    console.log("sakdggfdygygygd")
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleVillageChange = (selectedOption) => {
    setVillageId(selectedOption?.value || ""); 
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

  const getBoothNo = () => {
    axios.get(`${base_url}/api/surve/getSortBooth?villageId=${villageId}`)

    .then((resp)=>{
        const boothNo=resp.data.booths.map((item)=>({
            label:item.boothNo , value:item.boothNo
        }))
        setBoothOption(boothNo)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getAllVoters = () => {
    axios
      .get(`${base_url}/api/surve/searchVotter?name=true&boothNo=${boothNo}&serialNo=${srNo}&nameFilter=${voterName}&village=${villageName}&cardNumber=${cardNo}&page=${currentPage}`)
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
    
    }, []);


  useEffect(() => {
    getBoothNo()
 },[villageId])

  useEffect(() => {
    getAllVoters()
  }, [currentPage,villageName,boothNo,srNo,voterName,cardNo])
  

  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">नावानुसार यादी</h6>
            <p className=" flex gap-6">
              <h6 className="font-bold text-[#b91c1c] text-lg">महिला  :  {voterCount?.total}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">पुरुष  :  {voterCount?.total}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
            </p>
          </div>
          <hr className="py-2" />
          <p className=" text-[#b91c1c]">
            <span className="font-bold">विधानसभा</span> :
            <span className="font-bold text-lg">199</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
            {/* <Select
              label="गाव"
              className="w-full"
              placeholder="गाव"
              value={villageId}
              options={villageOption}
              onChange={handleVillageChange}
            /> */}
              <div>
        <label className="form-label" htmlFor="mul_1">
        गाव
        </label>
        <Select
  isClearable={true}
  placeholder="गाव"
  name="गाव"
  value={villageOption.find(option => option.value === villageId || '')} 
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
    isClearable={true}
    placeholder="भाग/बूथ नं"
    name="भाग/बूथ नं"
    value={boothOption.find(option => option.value === boothNo)} 
    options={boothOption}
    onChange={(selectedOption) => setBoothNo(selectedOption?.value || "")} 
    className="react-select"
    classNamePrefix="select"
  />
</div>

            <InputGroup
              type="text"
              label="अ.क्र."
              id="ps-1"
              isClearable={true}
              placeholder="अ.क्र."
              value={srNo}
              onChange={(e) => setSrNo(e.target.value)}
            />
            <InputGroup
              type="text"
              label="मतदाराचे नाव "
              id="ps-1"
              placeholder="मतदाराचे नाव "
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
            />
            <InputGroup
              type="text"
              label="EPIC/कार्ड नं"
              id="ps-1"
              placeholder="EPIC/कार्ड नं"
              value={cardNo}
              onChange={(e) => setCardNo(e.target.value)}
            />
            {/* <Select
              label="नातेसंबंधानुसार शोधा"
              className="w-full"
              placeholder="नातेसंबंधानुसार शोधा"
              options={SerachBy}
              value={relative}
              onChange={(e) => setRelative(e.target.value)}
            /> */}
            <div>
  <label className="form-label" htmlFor="mul_1">
  नातेसंबंधानुसार शोधा
  </label>
  <Select
    isClearable={false}
    placeholder="नातेसंबंधानुसार शोधा"
    name="नातेसंबंधानुसार शोधा"
    value={SerachBy.find(option => option.value === relative)} 
    options={SerachBy}
    onChange={(selectedOption) => setRelative(selectedOption?.value || "")} 
    className="react-select"
    classNamePrefix="select"
  />
</div>
            <InputGroup
              type="text"
              label="नातेदराचे नाव"
              id="ps-1"
              placeholder="नातेदराचे नाव"
              value={relativeName}
              onChange={(e) => setRelativeName(e.target.value)}
            />
            <div className="flex justify-end items-center mt-6">
            

             <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={()=>handleClear()}>
              Clear
              </button>
           
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <NameWiseCommonTable Props={allVoter} voterCount={voterCount} currentPage={currentPage}
          setCurrentPage={setCurrentPage} onPageChange={handlePageChange} />
      </Card>
      {/* <AddNewVoter/> */}
    </div>
  );
};

export default NameWiseList;
