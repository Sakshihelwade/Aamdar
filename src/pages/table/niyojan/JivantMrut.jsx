import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for API calls
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select, { components } from "react-select";
import { base_url } from "../../../config/base_url";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";


const JivantMrut = () => {
  const id = localStorage.getItem('_id')
  const [minBoothNo, setMinBoothNo] = useState('');
  const [maxBoothNo, setMaxBoothNo] = useState('');
  const [ganName,setGanName]=useState('')
  const [ganId,setGanId]=useState('')
  const [gathName,setGathName]=useState('')
  const [gathId,setGathId]=useState('')
  const [status, setStatus] = useState('');
  const [boothNo, setBoothNo] = useState(''); // Uncomment and use a single value
  const [voterName, setVoterName] = useState('');
  const [villageName, setVillageName] = useState("");
  const [villageId, setVillageId] = useState('');
  const [villageOptions, setVillageOptions] = useState([]);
  const [boothOptions, setBoothOptions] = useState([]);
  const [gathOption,setGathOption] = useState([])
  const [ganOption,setGanOption]=useState([])
  const [allVoters, setAllVoters] = useState([]);
  const [voterCount, setVoterCount] = useState(0); // Assuming voter count is a number
  const [currentPage, setCurrentPage] = useState(1);

  const totalmalefemale = voterCount?.maleCount + voterCount?.femaleCount
  const other = voterCount?.total - totalmalefemale || 0

  // const handleSearch = () => {
  //   getAllData();
  // };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // const handleVillageChange = (e) => {
  //   const selectedOption = villageOptions.find(option => option.value === e.target.value);
  //   setVillageId(e.target.value);
  //   setVillageName(selectedOption?.label || "");
  // };
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
    const url = `${base_url}/api/surve/searchVotter/${id}?name=true&printOut=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${minBoothNo}&maxBooth=${maxBoothNo}&aliveOrDead=${status}&nameFilter=${voterName}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`;
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

  // const handleStatusChange = (selectedOption) => {
  //   setStatus(selectedOption?.value || "");
  // };

  // Options for the "जिवंत / मृत" select dropdown
  const statusOptions = [
    { label: 'जिवंत', value: 'Alive' },
    { label: 'मृत', value: 'Dead' },
  ];

  // Fetch village options from API
  const getVillageOptions = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}?gathId=${gathId}&ganId=${ganId}`)
      .then((resp) => {
        const villageOptions = resp.data.village?.map((item) => ({
          label: item.name,
          value: item._id
        }));
        setVillageOptions(villageOptions || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch booth numbers based on selected village
  const getBoothNo = () => {
    axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
      .then((resp) => {
        const boothOptions = resp.data.booths?.map((item) => ({
          label: item.boothNo,
          value: item.boothNo
        }));
        setBoothOptions(boothOptions || []);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Fetch voter data from API
  const getAllData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/surve/searchVotter/${id}?name=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${minBoothNo}&maxBooth=${maxBoothNo}&aliveOrDead=${status}&nameFilter=${voterName}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`);
      setAllVoters(response.data.voters);
      setVoterCount(response.data || 0);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, boothNo, villageId, minBoothNo, maxBoothNo, voterName, status,ganName,gathName]);

  
  useEffect(() => {
    getGath()
   }, []);

  
   useEffect(()=>{
    getVillageOptions();
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
    setBoothNo('');
    setGanName('')
    setGanId('')
    setGathId('')
    setGathName('')
    setMinBoothNo('');
    setMaxBoothNo('');
    setStatus('');
    setVoterName('');
    getAllData();
  }


  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">जिवंत / मृत  </h6>
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

            <InputGroup
              type="text"
              label="यादी नं. पासून"
              id="ps-1"
              placeholder="यादी नं. पासून"
              value={minBoothNo || ''}  // Ensure it doesn't show any value if cleared
              onChange={(e) => setMinBoothNo(e.target.value)}
            />

            <InputGroup
              type="text"
              label="यादी नं. पर्यंत"
              id="ps-2"
              placeholder="यादी नं. पर्यंत"
              value={maxBoothNo || ''}  // Ensure it doesn't show any value if cleared
              onChange={(e) => setMaxBoothNo(e.target.value)}
            />
            <div>
              <label className="form-label" htmlFor="mul_1">
                जिवंत / मृत
              </label>
              <Select
                placeholder="जिवंत / मृत"
                name="जिवंत / मृत"
                value={statusOptions.find(option => option.value === status) || null} 
                options={statusOptions}
                onChange={(selectedOption) => setStatus(selectedOption?.value) || null} 
                className="react-select"
                classNamePrefix="select"
              />
            </div>

            <InputGroup
              type="text"
              label="मतदाराचे नाव"
              id="ps-4"
              placeholder="मतदाराचे नाव"
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
            />

            <span></span>
          
          </div>
          <div className="flex justify-end items-center gap-2 mt-6">
             
             <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
              Clear
             </button>
             <button onClick={handleExcel} className="bg-[#b91c1c] text-white px-5 h-10 rounded-md"> Excel</button>

           </div>
        </Card>
      </div>
      <Card>
        <CommonTable Props={allVoters} voterCount={voterCount}
          onPageChange={handlePageChange} />
      </Card>
    </div>
  );
};

export default JivantMrut;
