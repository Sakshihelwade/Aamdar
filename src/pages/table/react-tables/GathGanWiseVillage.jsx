import React, { useEffect, useState } from "react";
import CommonTable from "./CommonTable";
import Card from "../../../components/ui/Card";
// import Select from "@/components/ui/Select";
import Select, { components } from "react-select";
import * as XLSX from "xlsx";


import axios from "axios";
import { base_url } from "../../../config/base_url";

const GathGanWiseVillage = () => {
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

  const [villageOption, setVillageOption] = useState([]);
  const [boothOption,setBoothOption]=useState([])
  const [currentPage, setCurrentPage] = useState(1);
const id=localStorage.getItem('_id')
  const totalmalefemale=voterCount?.maleCount + voterCount?.femaleCount
  const other=voterCount?.total - totalmalefemale || 0


  const [totalMaleCount, setTotalMaleCount] = useState(0);
const [totalFemaleCount, setTotalFemaleCount] = useState(0);
const [totalCount, setTotalCount] = useState(0);

console.log(totalMaleCount,totalFemaleCount,totalCount)
  const handleClear = () => {
    setVillageId("");
    setGanId('')
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
    // Log the data for debugging
    console.log(data);
  
    // Create a header row with only गट and गण
    const header = [
      { 'गट': gathName, 'गण': ganName }
    ];
  
    // Define the main data rows
    const rows = data.map((item) => ({
      ['गाव']: item.address, 
      ['पुरुष']: item.maleCount, 
      ['महिला']: item.femaleCount, 
      ['एकून']: item.totalCount
    }));
  
    // Add a static row at the end
    const staticRow = {
      'गाव': 'एकून', 
      'पुरुष': rows.reduce((acc, item) => acc + item['पुरुष'], 0), 
      'महिला': rows.reduce((acc, item) => acc + item['महिला'], 0), 
      'एकून': rows.reduce((acc, item) => acc + item['एकून'], 0)
    };
  
    // Combine the header, main data rows, and static row
    const worksheetData = [...header, {}, ...rows, {}, staticRow];  // `{}` adds a blank row for separation
  
    // Create a new workbook
    const wb = XLSX.utils.book_new();
  
    // Convert the combined data into a worksheet
    const ws = XLSX.utils.json_to_sheet(worksheetData);
  
    // Apply bold formatting to the header cells
    const headerCell1 = ws['A1'];
    const headerCell2 = ws['B1'];
    if (headerCell1) headerCell1.s = { font: { bold: true } };
    if (headerCell2) headerCell2.s = { font: { bold: true } };
  
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Namewise Data");
  
    // Create a downloadable Excel file
    XLSX.writeFile(wb, "मतदार.xlsx");
  };
  

  const handleExcel = () => {
    const url = `${base_url}/api/surve/searchVotter/${id}?alphabet=true&CountTotalVillagesMaleFemale=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`;
    axios
      .get(url)
      .then((resp) => {
        var voters = resp.data.data;
       
        generateExcel(voters);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleVillageChange = (selectedOption) => {
    setVillageId(selectedOption?.value || "");
    setVillageName(selectedOption?.label || "");
  };

  const handleGathChange=(selectedOption) => {
    setGathName(selectedOption?.label || "")
    setGathId(selectedOption?.value || "")
    setGanId('')
    setGanName('')
    setVillageName('')
    setVillageId('')
  }

  const handleGanChange=(selectedOption) => {
    setGanName(selectedOption?.label || "")
    setGanId(selectedOption?.value || "")
    setVillageId('')
    setVillageName('')
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
    axios
      .get(`${base_url}/api/surve/searchVotter/${id}?alphabet=true&CountTotalVillagesMaleFemale=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`)
      .then((resp) => {
     
        setAllVoter(resp.data.data);
        setVoterCount(resp.data);
        let maleSum = 0;
        let femaleSum = 0;
        let grandTotal = 0;
  
        resp?.data?.data.forEach((voter) => {
          maleSum += voter.maleCount;
          femaleSum += voter.femaleCount;
          grandTotal += voter.totalCount;
        });
  
        setTotalMaleCount(maleSum);
        setTotalFemaleCount(femaleSum);
        setTotalCount(grandTotal);
      })
      .catch((error) => {
        console.log(error);
        // toast.warning('No results found for the provided search criteria')
      });
  };
 

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
},[currentPage,villageName,boothNo,fromList,toList,ganName, gathName])

  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">गट गणनुसार गाव यादी </h6>
            {/* <p className=" flex gap-6">
                            <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
                            <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
                            <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
                        </p> */}
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
{/* <div>
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
</div> */}
            {/* <InputGroup
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
            /> */}
           
            
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
      <table class="min-w-full bg-white border border-gray-300">
    <thead>
        <tr class="bg-gray-200 text-gray-700 border-b border-gray-300">
            <th class="py-1 px-4 border-r border-gray-300 text-left font-semibold">गाव</th>
            <th class="py-1 px-4 border-r border-gray-300 text-left font-semibold">पुरुष</th>
            <th class="py-1 px-4 border-r border-gray-300 text-left font-semibold">महिला</th>
            <th class="py-1 px-4 text-left font-semibold">एकून</th>
        </tr>
    </thead>
    <tbody>
    {
    allVoter?.map((item, i) => (
        <tr key={i} className="text-gray-800 border-b border-gray-300">
            <td className="py-1 px-4 border-r border-gray-300">{item.address}</td>
            <td className="py-1 px-4 border-r border-gray-300">{item.maleCount}</td>
            <td className="py-1 px-4 border-r border-gray-300">{item.femaleCount}</td>
            <td className="py-1 px-4">{item.totalCount}</td>
        </tr>
    ))
}
<tr className="text-gray-800 border-b border-gray-300">
  <td className="py-1 px-4 border-r border-gray-300 font-bold">एकून</td>
  <td className="py-1 px-4 border-r border-gray-300 font-bold">{totalMaleCount}</td>
  <td className="py-1 px-4 border-r border-gray-300 font-bold">{totalFemaleCount}</td>
  <td className="py-1 px-4 font-bold">{totalCount}</td>
</tr>

       
    </tbody>
</table>
      </Card>
    </div>
  );
};

export default GathGanWiseVillage;
