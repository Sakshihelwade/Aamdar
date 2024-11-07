import React, { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
// import Select from "@/components/ui/Select";
import Select, { components } from "react-select";

import axios from "axios";
import { base_url } from "../../../config/base_url";
import { toast } from "react-toastify";
import CommonTableAddressWise from "./CommonTableAddressWise";
import FamilyWiseTable from "./FamilyWiseTable";

const FamilyWise = () => {
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");
  const [fromList, setFromList] = useState("");
  const [toList, setToList] = useState("");
  const [gender, setGender] = useState("");
  const [ganName,setGanName]=useState('')
  const [ganId,setGanId]=useState('')
  const [gathName,setGathName]=useState('')
  const [gathId,setGathId]=useState('')
  const [allVoter, setAllVoter] = useState([])
  const [voterCount, setVoterCount] = useState()
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption, setBoothOption] = useState([])
  const [gathOption,setGathOption] = useState([])
  const [ganOption,setGanOption]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [countFamily, setCountFamily] = useState([])
  const [countFamilyTotal, setCountFamilyTotal] = useState([])
  const [selectedVoter, setSelectedDubar]= useState([])
  const id = localStorage.getItem('_id')
  const totalmalefemale = voterCount?.maleCount + voterCount?.femaleCount
  const other = voterCount?.total - totalmalefemale || 0
console.log(selectedVoter,"selectedVoter")
  
  const SerachBy = [
    { label: "पुरुष", value: "पुरुष" },
    { label: "महिला", value: "महिला" },

  ];

  const handleClear = () => {
    setGanId('')
    setGanName('')
    setGathId("")
    setGathName('')
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

  const handleVillageChange = (selectedOption) => {
    setVillageId(selectedOption?.value || "");
    setVillageName(selectedOption?.label || "");
    setBoothNo('')
  };

  const handleGathChange=(selectedOption) => {
    setGathName(selectedOption?.label || "")
    setGathId(selectedOption?.value || "")
    setGanId('')
    setGanName('')
    setVillageName('')
    setVillageId('')
    setBoothNo('')
  }

  const handleGanChange=(selectedOption) => {
    setGanName(selectedOption?.label || "")
    setGanId(selectedOption?.value || "")
    setVillageId('')
    setVillageName('')
    setBoothNo('')
  }

  const getGath= () => {
    axios.get(`${base_url}/api/surve/getAllVoterGath/${id}`)
       .then((resp)=>{
        const gathName=resp.data.gaths.map((item)=>({
            label:item.name , value:item._id
        }))
        setGathOption(gathName)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getGan= () => {
    axios.get(`${base_url}/api/surve/getAllVoterGan/${id}?gathaId=${gathId}`)
       .then((resp)=>{
        const gan=resp.data.Gans.map((item)=>({
            label:item.name , value:item._id
        }))
        setGanOption(gan)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getVillageOption = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}?gathId=${gathId}&ganId=${ganId}`)
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


  const getAllVoters = () => {
    axios.get(`${base_url}/api/surve/getFamilyMember/${selectedVoter?._id}`)
      .then((resp) => {
       
        setAllVoter(resp.data.voters);
        setVoterCount(resp.data);
        // toast.success('Filter Sucessfully')
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getCountFamily = () => {
    axios.get(`${base_url}/api/surve/searchVotter/${id}?isHeadOfFamily=true&name=true&village=${villageName}&boothNo=${boothNo}&minBooth=${fromList}&maxBooth=${toList}&gender=${gender}&page=${currentPage}&gathaId=${gathId}&ganId=${ganId}`)
      .then((resp) => {
      
         setCountFamily(resp?.data.voters)
        // setCountFamilyTotal(resp.data.voters.length)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const handleDubarVoter = (voter) => {
    setSelectedDubar(voter)
  }

  useEffect(()=>{
    getGan()
  },[gathName])

  
  useEffect(() => {
    getGath()
   }, []);

  useEffect(() => {
    getCountFamily()
  }, [currentPage])

  useEffect(() => {
    getVillageOption();
    getBoothNo()
  }, []);

  useEffect(() => {
    getBoothNo()
  }, [villageName])

  useEffect(() => {
    getAllVoters()
  }, [selectedVoter])


  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">कुटुंबानुसार यादी</h6>
            <p className=" flex gap-6">
              <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
              <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
              <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
            </p>
          </div>
          <hr className="py-2" />
          <p className=" text-[#b91c1c]">
            <span className="font-bold ">विधानसभा</span> :
            <span className="font-bold text-lg">8</span>
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          <div>
        <label className="form-label" htmlFor="mul_1">
        गट
        </label>
  <Select
  // isClearable={true}
  placeholder="गट"
  name="गट" 
  value={gathOption.find(option => option.value === gathId) || null} 
  options={gathOption}
  onChange={handleGathChange} 
  className="react-select"
  classNamePrefix="select"
/>
</div>
          <div>
        <label className="form-label" htmlFor="mul_1">
        गण
        </label>
  <Select
  // isClearable={true}
  placeholder="गण"
  name="गण" 
  value={ganOption.find(option => option.value === ganId) || null} 
  options={ganOption}
  onChange={handleGanChange} 
  className="react-select"
  classNamePrefix="select"
/>
</div>

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

            <div>
              <label className="form-label" htmlFor="mul_1">
                लिंग
              </label>
              <Select
                // isClearable={true}
                placeholder="लिंग"
                name="लिंग"
                value={SerachBy.find(option => option.value === gender) || null}
                options={SerachBy}
                onChange={(selectedOption) => setGender(selectedOption?.value || null)}
                className="react-select"
                classNamePrefix="select"
              />
            </div>
            <div className="flex justify-end items-center mt-6">
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={handleClear}>
                Clear
              </button>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="grid grid-cols-12">
          <div className=" col-span-4 mx-4">
            <FamilyWiseTable props={countFamily} total={countFamilyTotal} handleDubarVoter={handleDubarVoter} />
          </div>
          
          <div className=" col-span-8 mx-4">
            <CommonTable Props={allVoter} voterCount={voterCount} currentPage={currentPage}
              setCurrentPage={setCurrentPage} onPageChange={handlePageChange}  />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FamilyWise;
