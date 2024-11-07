import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
// import Select from "@/components/ui/Select";
import Select, { components } from "react-select";

import DubarTable1 from "./DubarTable1";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import DubarTable2 from "./DubarTable2";

const Dubar = () => {
    const id = localStorage.getItem('_id');
    const [allVoter, setAllVoter] = useState('')
    const [ganName,setGanName]=useState('')
    const [ganId,setGanId]=useState('')
    const [gathName,setGathName]=useState('')
    const [gathId,setGathId]=useState('')
    const [voterCount, setVoterCount] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [dubarVoter, setDubarVoter] = useState([])
    const [dubarVoterCount, setDubarVoterCount] = useState([])
    const [gathOption,setGathOption] = useState([])
    const [ganOption,setGanOption]=useState([])
    const [selectedDubar, setSelectedDubar] = useState()
    const [boothNo, setBoothNo] = useState("")
    const [villageName, setVillageName] = useState("")
    const [villageId, setVillageId] = useState("")
    const [boothOptions, setBoothOptions] = useState([])
    const [villageOptions, setVillageOptions] = useState([])
    const totalmalefemale=voterCount?.maleCount + voterCount?.femaleCount
  const other=voterCount?.total - totalmalefemale || 0
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        getAllVillages()
    }, [gathId, ganId])

    useEffect(() => {
        getAllBooth()
    }, [villageId])

    const getAllVoters = () => {
        axios.get(`${base_url}/api/surve/searchVotter/${id}?nameDuplicate=${selectedDubar?.name}`)
            .then((resp) => {
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
        axios.get(`${base_url}/api/surve/searchVotter/${id}?duplicateNamesWeb=true&gathaId=${gathId}&ganId=${ganId}&village=${villageName}&boothNo=${boothNo}`)
            .then((resp) => {
                console.log(resp.data,"//////.....")
                setDubarVoter(resp?.data.data)
                setDubarVoterCount(resp.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getAllVillages = async () => {
        try {
            const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}?gathId=${gathId}&ganId=${ganId}`);
        
            const villages = response.data.village?.map((item) => ({
                label: item.name,
                value: item._id,
            }));
            setVillageOptions(villages);
        } catch (error) {
            console.log(error);
        }
    };

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

    useEffect(() => {
        getAllVoters()
    }, [currentPage, selectedDubar])

    useEffect(() => {
        getDubarVoter()
    }, [gathId,ganId,villageName,boothNo])

    useEffect(()=>{
        getGan()
    },[gathName])

    useEffect(()=>{
        getGath()
    },[])

    const clearFields =()=>{
        setGanId('')
        setGanName('')
        setGathId("")
        setGathName('')
         setGathName('')
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
                            {/* <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6> */}
                        </p>
                    </div>
                    <hr className="py-2" />
                    <p>
                        <span className="font-bold">विधानसभा</span>{" "}
                        <span className="font-bold text-lg"> 8</span>
                    </p>
                  <div className="grid grid-cols-4 gap-2">
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
  value={villageOptions.find(option => option.value === villageId) || null} 
  options={villageOptions}
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
  value={boothOptions.find(option => option.value === boothNo) || null} 
  options={boothOptions}
  onChange={(selectedOption) => setBoothNo(selectedOption?.value || null)} 
  className="react-select"
  classNamePrefix="select"
/>
</div>
                        <span></span>
                       
                    </div> 
                    <div className="flex justify-end gap-4 items-center mt-6">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                               Clear
                            </button>
                        </div>
                </Card>
            </div>
            <Card>
                <div className=" grid grid-cols-12">
                    <div className="col-span-4 mx-4">
                        <DubarTable1 Props={dubarVoter} voterCount={dubarVoterCount} handleDubarVoter={handleDubarVoter} />
                    </div>
                    <div className="col-span-8 ml-4">
                        <DubarTable2 Props={allVoter} voterCount={voterCount}
                            onPageChange={handlePageChange} />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dubar;
