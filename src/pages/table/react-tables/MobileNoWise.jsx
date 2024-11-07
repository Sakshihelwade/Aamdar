import React, { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
// import Select from "@/components/ui/Select";
import Select, { components } from "react-select";
import * as XLSX from "xlsx";


import axios from "axios";
import { base_url } from "../../../config/base_url";
import { toast } from "react-toastify";

const MobileNoWise = () => {
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");
  const [fromList, setFromList] = useState("");
  const [toList, setToList] = useState("");
  const [ganName,setGanName]=useState('')
  const [ganId,setGanId]=useState('')
  const [gathName,setGathName]=useState('')
  const [gathId,setGathId]=useState('')
  const [allVoter,setAllVoter]=useState([])
  const [gathOption,setGathOption] = useState([])
  const [ganOption,setGanOption]=useState([])
  const [voterCount,setVoterCount]=useState()
  const [status, setStatus] = useState('');
  const [mobileNo,setMobileNo]=useState('');
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption,setBoothOption]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
const id=localStorage.getItem('_id')
  const totalmalefemale=voterCount?.maleCount + voterCount?.femaleCount
  const other=voterCount?.total - totalmalefemale || 0


  const handleClear = () => {
    setVillageId("");
    setGanId('')
    setMobileNo('')
    setStatus('')
    setGanName('')
    setGathId('')
    setGathName('')
    setVillageName("");
    setBoothNo("");
    setToList("");
    setFromList("");
   getAllVoters()
    
  };

  const generateExcel = (data) => {
    const rows = data.map((item) => ({
      ['भाग/बूथ नं']: item.boothNo, 
      ['अ.क्र.']: item.serialNo, 
      ['नाव']: item.name, 
      ['वय']: item.age  , 
      ['लिंग']: item.gender, 
      ['घर नं']: item.houseNo, 
      ['पत्ता']: item.address , 
      ['कार्ड नं']: item.cardNumber,
     
    }));

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the data into a worksheet
    const ws = XLSX.utils.json_to_sheet(rows);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Namewise Data");

    // Create a downloadable Excel file
    XLSX.writeFile(wb, "मतदार.xlsx");
  };

  const handleExcel = () => {
    const url = `${base_url}/api/surve/searchVotter/${id}?name=true&printOut=true&boothNo=${boothNo}&village=${villageName}&minBooth=${fromList}&maxBooth=${toList}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`;
    axios
      .get(url)
      .then((resp) => {
        var voters = resp.data.voters;
       
        generateExcel(voters);
      })
      .catch((error) => {
        toast.warning('You can only print 5000 records at a time')
        console.error(error);
      });
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

  const getBoothNo=()=>{
    axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
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
    const url = status === ""
      ? `${base_url}/api/surve/searchVotter/${id}?name=true&mobile=${mobileNo}&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${fromList}&maxBooth=${toList}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`
      : `${base_url}/api/surve/searchVotter/${id}?mobileSort=${status}&mobile=${mobileNo}&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${fromList}&maxBooth=${toList}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`;
  
    axios
      .get(url)
      .then((resp) => {
        setAllVoter(resp.data.voters);
        setVoterCount(resp.data);
        // toast.success('Filter Successfully')
      })
      .catch((error) => {
        console.log(error);
        // toast.warning('No results found for the provided search criteria')
      });
  };
  
 
  const statusOptions = [
    { label: 'मोबाईल नं. असलेले मतदार', value:true },
    { label: 'मोबाईल नं. नसलेले मतदार', value: false },
  ];

  useEffect(() => {
    getGath()
   }, []);

  
   useEffect(()=>{
    getVillageOption();
   },[gathName,ganName])

useEffect(()=>{
  getGan()
},[gathName])


  useEffect(() => {
    getBoothNo()
 },[villageId])

useEffect(()=>{
  getAllVoters()
},[currentPage,villageName,boothNo,fromList,toList,ganName, gathName,status,mobileNo])

  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">मोबाईल नंबर नुसार </h6>
            <p className=" flex gap-6">
                            <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
                            <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
                            <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
                        </p>
          </div>
          <hr className="py-2" />
          <p className=" text-[#b91c1c]">
            <span className="font-bold">विधानसभा</span> :
            <span className="font-bold text-lg"> 8</span>
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
              placeholder="यादी नं. पर्यंत"
              value={toList}
              onChange={(e) => setToList(e.target.value)}
            />
           
           <div>
              <label className="form-label" htmlFor="mul_1">
              मोबाईल नं. असलेले / नसलेले
              </label>
              <Select
                placeholder="मोबाईल नं. असलेले/नसलेले"
                name="मोबाईल नं. असलेले/नसलेले"
                value={statusOptions.find(option => option.value === status) || null} 
                options={statusOptions}
                onChange={(selectedOption) => setStatus(selectedOption?.value) || null} 
                className="react-select"
                classNamePrefix="select"
              />
            </div>
            <InputGroup
              type="text"
              label="मोबाईल नं."
              id="ps-1"
              placeholder="मोबाईल नं."
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
            />
          </div>
          <div className="flex justify-end items-center gap-2 mt-6">
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={handleClear}>
                Clear
              </button>
              <button onClick={handleExcel} className="bg-[#b91c1c] text-white px-5 h-10 rounded-md"> Excel</button>

            </div>
        </Card>
      </div>
      <Card>
        <CommonTable Props={allVoter} voterCount={voterCount}  onPageChange={handlePageChange}
         currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Card>
    </div>
  );
};

export default MobileNoWise;
