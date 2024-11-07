import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select, { components } from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import * as XLSX from "xlsx";


const Karyakartyanusar = () => {
  // State management
  const id = localStorage.getItem('_id')
  const [boothNo, setBoothNo] = useState("")
  const [villageName, setVillageName] = useState("");
  const [endListNo, setEndListNo] = useState("");
  const [voterCount, setVoterCount] = useState();
  const [ganName,setGanName]=useState('')
  const [ganId,setGanId]=useState('')
  const [gathName,setGathName]=useState('')
  const [gathId,setGathId]=useState('')
  const [karyakartaName, setKaryakartaName] = useState("");

  const [allVoter, setAllVoter] = useState([])
  const [villageId, setVillageId] = useState(""); 
  const [villageOption, setVillageOption] = useState([]); 
  const [boothOption, setBoothOption] = useState([]); 
  const [minBoothNo, setMinBoothNo] = useState(""); 
  const [maxBoothNo, setMaxBoothNo] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [gathOption,setGathOption] = useState([])
  const [ganOption,setGanOption]=useState([])
  const [users, setUsers] = useState([])
  // console.log(boothOption, "///")
  const totalmalefemale = voterCount?.maleCount + voterCount?.femaleCount
  const other = voterCount?.total - totalmalefemale || 0

  // const handleVillageChange = (e) => {
  //   const selectedOption = villageOption.find(option => option.value === e.target.value);
  //   setVillageId(e.target.value);
  //   setVillageName(selectedOption?.label || "");
  // };
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
    setBoothNo('')
  }

  const handleGanChange=(selectedOption) => {
    setGanName(selectedOption?.label || "")
    setGanId(selectedOption?.value || "")
    setVillageId('')
    setVillageName('')
    setBoothNo('')
  }

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
    const url = `${base_url}/api/surve/get-karaykarta-Voters/${karyakartaName}?checkNonVoted=true&printOut=true&village=${villageName}&boothNo=${boothNo}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}&page=${currentPage}`;
    axios
      .get(url)
      .then((resp) => {
        var voters = resp.data.voters;
       
        generateExcel(voters);
      })
      .catch((error) => {
        console.error(error);
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
        console.log(resp.data,"//gan")
        const gan=resp.data.Gans.map((item)=>({
            label:item.name , value:item._id
        }))
        setGanOption(gan)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleKaryakartaChange = (selectedOption) => {
    setKaryakartaName(selectedOption?.value || "");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getVillageOption();
  }, []);



  // Handlers for input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };


  const getVillageOption = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}?gathId=${gathId}&ganId=${ganId}`)
      .then((resp) => {
        const villageOptions = resp.data.village?.map((item) => ({
          label: item.name,
          value: item._id
        }));
        setVillageOption(villageOptions || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const getBoothNo = () => {
    axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
      .then((resp) => {
        // console.log(resp.data, "{{{{{{{")
        const boothOptions = resp.data.booths?.map((item) => ({
          label: item.boothNo,
          value: item.boothNo
        }));
        setBoothOption(boothOptions || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/getAllUser`);
      const karyakarta = response.data.users?.map((item) => ({
        label: item?.fullName,
        value: item?._id,
      }));
      setUsers(karyakarta)
    } catch (error) {
      console.log(error);
    }
  };

  const getAllVotersList = async () => {
    try {
      const response = await axios.get(`${base_url}/api/surve/get-karaykarta-Voters/${karyakartaName}?checkNonVoted=true&village=${villageName}&boothNo=${boothNo}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}&page=${currentPage}`)
      setAllVoter(response.data.voters)
      setVoterCount(response.data || 0);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllData()
  }, [currentPage])

  useEffect(() => {
    getAllVotersList()
  }, [currentPage, villageName, boothNo,gathName,ganName,karyakartaName])

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


  const clearFields = () => {
    setVillageId('');
    setVillageName('');
    setGanId('')
    setGanName('')
    setGathId('')
    setGathName('')
    setKaryakartaName('');
    setBoothNo('');
  }
  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">कार्यकर्त्यानुसार  </h6>
            <p className=" flex gap-6">
              <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
              <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
              <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
            </p>
          </div>
          <hr className="mb-3" />
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

            {/* गाव (Village) */}
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
            {/* यादी नं. पासून (List No. From) */}
            {/* <InputGroup
              type="text"
              label="यादी नं. पासून"
              id="list-start"
              placeholder="यादी नं. पासून"
              value={minBoothNo} // Link the state
              onChange={handleInputChange(setMinBoothNo)} // Set the state on change
            /> */}

            {/* यादी नं. पर्यंत (List No. To) */}
            {/* <InputGroup
              type="text"
              label="यादी नं. पर्यंत"
              id="list-end"
              placeholder="यादी नं. पर्यंत"
              value={maxBoothNo} // Link the state
              onChange={handleInputChange(setMaxBoothNo)} // Set the state on change
            /> */}

            {/* कार्यकर्त्याचे नाव (Karyakarta Name) */}

            <div>
              <label className="form-label" htmlFor="mul_1">
                कार्यकर्त्याचे नाव
              </label>
              <Select
                placeholder="कार्यकर्त्याचे नाव"
                name="कार्यकर्त्याचे नाव"
                value={users.find(option => option.value === karyakartaName) || null}
                options={users}
                onChange={handleKaryakartaChange} // Update here
                className="react-select"
                classNamePrefix="select"
              />

            </div>


            {/* Display counts */}
            {/* <div className="col-span-1 flex mt-8 items-center">
              <span>पुरुष : {maleCount}</span>
            </div>
            <div className="col-span-1 flex mt-8 items-center">
              <span>स्त्री : {femaleCount}</span>
            </div>
            <div className="col-span-1 flex mt-8 items-center">
              <span>एकूण : {maleCount + femaleCount}</span>
            </div> */}

            {/* Search button */}
            <div className="flex justify-end items-center gap-2 mt-8">
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
              Clear
              </button>
              <button onClick={handleExcel} className="bg-[#b91c1c] text-white px-5 h-10 rounded-md"> Excel</button>

            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CommonTable Props={allVoter} voterCount={voterCount}
          onPageChange={handlePageChange} />
      </Card>
    </div>
  );
};

export default Karyakartyanusar;
