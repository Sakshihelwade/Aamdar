import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select, { components } from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";


const RedGreenVoter = () => {
  const id = localStorage.getItem('_id')
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [ganName,setGanName]=useState('')
  const [ganId,setGanId]=useState('')
  const [gathName,setGathName]=useState('')
  const [gathId,setGathId]=useState('')
  const [boothOption, setBoothOption] = useState([]); // Ensure it's an array
  const [minBoothNo, setMinBoothNo] = useState("");
  const [maxBoothNo, setMaxBoothNo] = useState("");
  const [voterName, setVoterName] = useState("");
  const [color, setColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [gathOption,setGathOption] = useState([])
  const [ganOption,setGanOption]=useState([])
  const [villageOption, setVillageOption] = useState([]); // Ensure it's an array
  const [allVoter, setAllVoter] = useState([])
  const [voterCount, setVoterCount] = useState(0)
  const [boothNo, setBoothNo] = useState("")
  const [colorOptions, setColorOptions] = useState([]);

  const totalmalefemale = voterCount?.maleCount + voterCount?.femaleCount
  const other = voterCount?.total - totalmalefemale || 0

 
  useEffect(() => {
    getVillageOption();
  }, [gathId,ganId]);

  useEffect(() => {
    getBoothNo();
  }, [villageId]);

  useEffect(() => {
    getAllData();
  }, [currentPage, villageId, boothNo, minBoothNo, maxBoothNo, voterName, color,ganName,gathName]); // Automatically fetch on any state change

  useEffect(() => {
    getColorOptions()
  }, [])

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handler for input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSelectChange = (selectedOption) => {
    setColor(selectedOption?.value || null);
    // console.log("Selected color: ", selectedOption?.value); // This will log the selected color
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
    const url = `${base_url}/api/surve/searchVotter/${id}?name=true&printOut=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${minBoothNo}&maxBooth=${maxBoothNo}&nameFilter=${voterName}&colour=${color}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`;
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
        console.log(resp.data.village, "/./.")
        const villageOptions = resp.data.village?.map((item) => ({
          label: item?.name,
          value: item?._id
        }));
        setVillageOption(villageOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBoothNo = () => {
    axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
      .then((resp) => {
        const boothOptions = resp.data.booths?.map((item) => ({
          label: item.boothNo,
          value: item.boothNo
        }));
        setBoothOption(boothOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllData = async () => {
    try {
      const response = await axios.get(`${base_url}/api/surve/searchVotter/${id}?name=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${minBoothNo}&maxBooth=${maxBoothNo}&nameFilter=${voterName}&colour=${color}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`);
      console.log(response.data);
      setAllVoter(response.data.voters)
      setVoterCount(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const getColorOptions = async () => {
    try {
      const response = await axios.get(`${base_url}/get-colour`)
      // console.log(response.data)
      const colors = response.data.data?.map((item) => ({
        label: item.color,
        value: item.color
      }));
      setColorOptions(colors)
    } catch (error) {
      console.log(error)
    }
  }

  const clearFields = () => {
    setVillageId("");
    setVillageName("");
    setGanId('')
    setGanName('')
    setGathId("")
    setGathName('')
    setBoothNo("");
    setMinBoothNo(""); 
    setMaxBoothNo("");
    setVoterName("");
    setColor(null); 
    getAllData();
  };
  

  useEffect(() => {
    getGath()
   }, []);

   useEffect(()=>{
    getGan()
  },[gathName])

  return (
    <div>
      <div className="mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]"> रेड / ग्रीन मतदार </h6>
            <div className=" flex gap-6">
              <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
              <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
              <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
            </div>
          </div>
          <hr className="mb-3" />
          <p>
            <span className="font-bold">विधानसभा</span>{" "}
            <span className="font-bold text-lg">8</span>
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
              id="list-start"
              placeholder="यादी नं. पासून"
              value={minBoothNo} // Link the state
              onChange={handleInputChange(setMinBoothNo)} // Set the state on change
            />

            <InputGroup
              type="text"
              label="यादी नं. पर्यंत"
              id="list-end"
              placeholder="यादी नं. पर्यंत"
              value={maxBoothNo} // Link the state
              onChange={handleInputChange(setMaxBoothNo)} // Set the state on change
            />

            <InputGroup
              type="text"
              label="मतदाराचे नाव"
              id="voter-name"
              placeholder="मतदाराचे नाव"
              value={voterName} // Link the state
              onChange={handleInputChange(setVoterName)} // Set the state on change
            />

            <div>
              <label className="form-label" htmlFor="mul_1">
                रंग
              </label>
              <Select
                placeholder="रंग"
                name="रंग"
                value={colorOptions.find(option => option.value === color) || null} // Correct value linking
                options={colorOptions}
                onChange={handleSelectChange} // Updated handler
                className="react-select"
                classNamePrefix="select"
              />

            </div>
        
          
          </div>
          <div className="flex justify-end gap-2 items-center  mt-6">
            
            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
             Clear
            </button>
            <button onClick={handleExcel} className="bg-[#b91c1c] text-white px-5 h-10 rounded-md"> Excel</button>
              
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

export default RedGreenVoter;
