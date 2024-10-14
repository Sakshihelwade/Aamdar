import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select"; // Assuming Select is a dropdown component
import axios from "axios";
import { base_url } from "../../../config/base_url";
import CommonTableKaryakarta from "../react-tables/CommonTableKaryakarta";

const Karyakartyanusar = () => {
  // State management
  const [boothNo, setBoothNo] = useState("")
  const [villageName, setVillageName] = useState("");
  const [endListNo, setEndListNo] = useState("");
  const [voterCount, setVoterCount] = useState();
  const [karyakartaName, setKaryakartaName] = useState("");
  const [maleCount, setMaleCount] = useState(12345); // Example counts
  const [femaleCount, setFemaleCount] = useState(123456); // Example counts
const [allVoter,setAllVoter]=useState([])
  const [villageId, setVillageId] = useState(""); // State for selected village ID
  const [villageOption, setVillageOption] = useState([]); // State for village dropdown options
  const [boothOption, setBoothOption] = useState([]); // State for booth dropdown options
  const [minBoothNo, setMinBoothNo] = useState(""); // State for minimum booth number
  const [maxBoothNo, setMaxBoothNo] = useState(""); // State for maximum booth number
  const [currentPage, setCurrentPage] = useState(1);
console.log(boothOption,"///")

  const handleVillageChange = (e) => {
    const selectedOption = villageOption.find(option => option.value === e.target.value);
    setVillageId(e.target.value);
    setVillageName(selectedOption?.label || "");
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
    axios.get(`${base_url}/api/surve/getAllVoterVillages`)
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
    axios.get(`${base_url}/api/surve/getSortBooth?villageId=${villageId}`)
      .then((resp) => {
        console.log(resp.data,"{{{{{{{")
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
      console.log(response.data, "responseeeeeeeeee");
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(()=>{
    getAllData()

  },[currentPage])

  useEffect(()=>{
    getBoothNo()
  },[villageId])

  return (
    <div>
      <div className="mb-4">
        <Card>
          <p>
            <span className="font-bold">विधानसभा</span>{" "}
            <span className="font-bold text-lg">199</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
            {/* गाव (Village) */}
            <Select
              label="गाव"
              className="w-full"
              placeholder="गाव"
              value={villageId} // Use villageId as value
              options={villageOption} // Ensure options are passed correctly
              onChange={handleVillageChange}
            />

            {/* भाग/बूथ नं (Booth No) */}
            <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              value={boothNo} // Bind the selected booth number
              options={boothOption} // Ensure options are passed correctly
              onChange={(e) => setBoothNo(e.target.value)} // Set booth number
            />

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
            <InputGroup
              type="text"
              label="कार्यकर्त्याचे नाव"
              id="karyakarta-name"
              placeholder="कार्यकर्त्याचे नाव"
              value={karyakartaName} // Connect state
              onChange={handleInputChange(setKaryakartaName)} // Update state
            />
            

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
            <div className="flex justify-end items-center mt-6">
              <button className="bg-orange-400 text-white px-5 h-10 rounded-md" onClick={getAllData}>
                शोधा
              </button>
            </div>
          </div>
        </Card>
      </div>

      <Card>
      <CommonTableKaryakarta Props={allVoter} voterCount={voterCount} 
         onPageChange={handlePageChange} />  
          </Card>
    </div>
  );
};

export default Karyakartyanusar;
