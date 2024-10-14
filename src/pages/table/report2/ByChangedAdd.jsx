import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const ByChangedAdd = () => {
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");

const [nagar,setNagar]=useState('')
const [newAddress,setNewAddress]=useState('')
const [society,setSociety]=useState('')
const [homeType,setHomeType]=useState('')
const [homeNo,setHomeNo]=useState('')
const [voterName,setVoterName]=useState('')
const [type,setType]=useState('')
const [mobileNo,setMobileNo]=useState('')
const [surve,setSurve]=useState('')
const [villageOption, setVillageOption] = useState([]);
const [boothOption,setBoothOption]=useState([])

const [allVoter,setAllVoter]=useState('')
const [voterCount,setVoterCount]=useState()
const [currentPage, setCurrentPage] = useState(1);


const handleVillageChange = (e) => {
  const selectedOption = villageOption.find(option => option.value === e.target.value);
  setVillageId(e.target.value); 
  setVillageName(selectedOption?.label || ""); 
};

const handlePageChange = (page) => {
  setCurrentPage(page);
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
          label:item.boothNo , value:item._id
      }))
      setBoothOption(boothNo)

  })
  .catch((error)=>{
      console.log(error)
  })
}

const getAllVoters = () => {
  axios.get(`${base_url}/api/surve/searchVotter?name=true&village=${villageName}&boothNo=${boothNo}&nameFilter=${voterName}&page=${currentPage}`)
    .then((resp) => {
      setAllVoter(resp.data.voters);
      setVoterCount(resp.data);
      toast.success('Filter Sucessfully')
    })
    .catch((error) => {
      console.log(error);
      toast.warning('No results found for the provided search criteria')
    });
};

useEffect(()=>{
  getBoothNo()
},[villageId])

useEffect(()=>{
getAllVoters()
},[currentPage])

useEffect(()=>{
  getVillageOption()
},[])

const HomeType=[
  {label:'स्वतःचे घर',value:'स्वतःचे घर'},
  {label:'भाडेकरू',value:'भाडेकरू'},
  {label:'स्थानांतरित',value:'स्थानांतरित'},
  {label:'घर बंद',value:'घर बंद'},
]

const TypeOption=[
  {label:'सर्व',value:'सर्व'},
  {label:'मतदार',value:'मतदार'},
  {label:'इतर',value:'इतर'},
]

const SurveyOption=[
  {label:'सर्वे झालेले',value:'सर्वे झालेले'},
  {label:'सर्वे न झालेले',value:'सर्वे न झालेले'}
]

  return (
    <div>
        <div className=" mb-4">
      <Card>
      <div className="mb-2">
            <h6 className="font-bold text-orange-400">बदललेले पत्त्यानुसार </h6>
          </div>
          <hr className="py-2" />
        <p>
         
          <span className="font-bold">विधानसभा</span>{" "}
          <span className="font-bold text-lg">199</span>
        </p>
        <div className=" grid grid-cols-4 gap-2">
          <Select
            label="गाव"
            className="w-full"
            placeholder="गाव"
              options={villageOption}
              onChange={handleVillageChange}
              value={villageId}
          />
           <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              options={boothOption}
              onChange={(e) =>setBoothNo(e.target.value)}
              value={boothNo}
            />
          <Select
            label="नगर"
            className="w-full"
            placeholder="नगर"
            //   options={options}
              onChange={(e)=>setNagar(e.target.value)}
              value={nagar}
          />
          <InputGroup
           type="text" 
           label="नवीन पत्ता"
            id="ps-1"
             placeholder="नवीन पत्ता"
             onChange={(e)=>setNewAddress(e.target.value)}
             value={newAddress}
              />
          <Select
            label="सोसायटी"
            className="w-full"
            placeholder="सोसायटी"
            //   options={options}
            onChange={(e)=>setSociety(e.target.value)}
            value={society}
          />
          <Select
            label="घराचा प्रकार"
            className="w-full"
            placeholder="घराचा प्रकार"
              options={HomeType}
            onChange={(e)=>setHomeType(e.target.value)}
            value={homeType}
          />
          <InputGroup
            type="text"
            label="नवीन घर क्र."
            id="ps-1"
            placeholder="नवीन घर क्र."
            onChange={(e)=>setHomeNo(e.target.value)}
            value={homeNo}
          />
           <InputGroup
            type="text"
            label="मतदाराचे नाव"
            id="ps-1"
            placeholder="मतदाराचे नाव"
            onChange={(e)=>setVoterName(e.target.value)}
            value={voterName}
          />
          <Select
            label="प्रकार"
            className="w-full"
            placeholder="प्रकार"
              options={TypeOption}
            onChange={(e)=>type(e.target.value)}
            value={setType}
          />
           <InputGroup
            type="text"
            label="मोबाईल नं"
            id="ps-1"
            placeholder="मोबाईल नं"
            onChange={(e)=>setMobileNo(e.target.value)}
            value={mobileNo}
          />
          <Select
            label="सर्वे"
            className="w-full"
            placeholder="सर्वे"
              options={SurveyOption}
            onChange={(e)=>setSurve(e.target.value)}
            value={surve}
          />
          <div className=" flex  items-center mt-6">
          एकूण मतदार :
          </div>
         
        </div>
        <div className="flex justify-end items-center mt-6">
              <button className="bg-orange-400 text-white px-5 h-10 rounded-md" onClick={getAllVoters}>
                शोधा
              </button>
            </div>
      </Card>
      </div>
      <Card>
      <CommonTable  Props={allVoter} voterCount={voterCount}   
   onPageChange={handlePageChange}/>
      </Card>
    </div>
  );
};

export default ByChangedAdd;
