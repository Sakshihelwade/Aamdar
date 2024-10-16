import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select"; // Assuming Select is a dropdown component
import axios from "axios";
import { base_url } from "../../../config/base_url";

const Karyakartyanusar = () => {
  // State management
  const [boothNo, setBoothNo] = useState("")
  const [villageName, setVillageName] = useState("");
  const [endListNo, setEndListNo] = useState("");
  const [voterCount, setVoterCount] = useState();
  const [karyakartaName, setKaryakartaName] = useState("");
  const [maleCount, setMaleCount] = useState(12345); // Example counts
  const [femaleCount, setFemaleCount] = useState(123456); // Example counts
  const [allVoter, setAllVoter] = useState([])
  const [villageId, setVillageId] = useState(""); // State for selected village ID
  const [villageOption, setVillageOption] = useState([]); // State for village dropdown options
  const [boothOption, setBoothOption] = useState([]); // State for booth dropdown options
  const [minBoothNo, setMinBoothNo] = useState(""); // State for minimum booth number
  const [maxBoothNo, setMaxBoothNo] = useState(""); // State for maximum booth number
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([])
  console.log(boothOption, "///")

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
        console.log(resp.data, "{{{{{{{")
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
      console.log(response.data.users, "responseeeeeeeeee");
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
      const response = await axios.get(`${base_url}/api/surve/searchVotter?name=true&village=${villageName}&boothNo=${boothNo}&page=${currentPage}`)
      // console.log(response.data,'llllllllllllllll')
      setAllVoter(response.data.voters)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getAllData()
  }, [currentPage])

  useEffect(() => {
    getAllVotersList()
  }, [currentPage, villageName, boothNo])

  useEffect(() => {
    getBoothNo()
  }, [villageId])

  const clearFields = () => {
    setVillageId('');
    setVillageName('');
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
              <h6 className="font-bold text-[#b91c1c] text-lg">महिला  :  {voterCount?.total}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">पुरुष  :  {voterCount?.total}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
            </p>
          </div>
          <hr className="mb-3" />
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
              value={villageId}
              options={villageOption}
              onChange={handleVillageChange}
            />

            {/* भाग/बूथ नं (Booth No) */}
            <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              value={boothNo}
              options={boothOption}
              onChange={(e) => setBoothNo(e.target.value)}
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
            <Select
              label="कार्यकर्त्याचे नाव"
              className="w-full"
              placeholder="कार्यकर्त्याचे नाव"
              value={karyakartaName}
              options={users}
              onChange={(e) => setKaryakartaName(e.target.value)}
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
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                क्लियर करा
              </button>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <CommonTable Props={allVoter}
          onPageChange={handlePageChange} />
      </Card>
    </div>
  );
};

export default Karyakartyanusar;
