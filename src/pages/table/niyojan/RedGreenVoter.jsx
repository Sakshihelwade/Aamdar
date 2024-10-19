import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select, { components } from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const RedGreenVoter = () => {
  const id = localStorage.getItem('_id')
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothOption, setBoothOption] = useState([]); // Ensure it's an array
  const [minBoothNo, setMinBoothNo] = useState("");
  const [maxBoothNo, setMaxBoothNo] = useState("");
  const [voterName, setVoterName] = useState("");
  const [color, setColor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [villageOption, setVillageOption] = useState([]); // Ensure it's an array
  const [allVoter, setAllVoter] = useState([])
  const [voterCount, setVoterCount] = useState(0)
  const [boothNo, setBoothNo] = useState("")

  const totalmalefemale=voterCount?.maleCount + voterCount?.femaleCount
  const other=voterCount?.total - totalmalefemale || 0

  useEffect(() => {
    getVillageOption();
  }, []);

  useEffect(() => {
    getBoothNo();
  }, [villageId]);

  useEffect(() => {
    getAllData();
  }, [currentPage, villageId, boothNo, minBoothNo, maxBoothNo, voterName, color]); // Automatically fetch on any state change


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handler for input changes
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSelectChange = (e) => {
    setColor(e.target.value);
  };

  // const handleVillageChange = (e) => {
  //   const selectedOption = villageOption.find(option => option.value === e.target.value);
  //   setVillageId(e.target.value);
  //   setVillageName(selectedOption?.label);
  // };
  const handleVillageChange = (selectedOption) => {
    setVillageId(selectedOption?.value || "");
    setVillageName(selectedOption?.label || "");
  };

  const options = [
    { label: 'red', value: '1' },
    { label: 'green', value: '2' },
  ];

  const getVillageOption = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
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
      const response = await axios.get(`${base_url}/api/surve/searchVotter/${id}?name=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${minBoothNo}&maxBooth=${maxBoothNo}&nameFilter=${voterName}&colour=${color}`);
      console.log(response.data);
      setAllVoter(response.data.voters)
      setVoterCount(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  const clearFields = () => {
    setVillageId("");
    setVillageName("");
    setBoothNo("");
    setMinBoothNo = useState("");
    setMaxBoothNo("");
    setVoterName("");
    setColor("");
    setBoothNo("");
    getAllData(); // Fetch all data with no parameters
  };

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
            <span className="font-bold text-lg">199</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
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

            {/* <Select
              label="रंग"
              className="w-full"
              placeholder="सर्व"
              value={color} // Link the state
              onChange={handleSelectChange} // Set the state on change
              options={options}
            /> */}
            <span></span>
            <span></span>
            {/* <span className="mt-10">एकूण मतदार: {voterCount?.total}</span> */}
            <div className="flex justify-end gap-4 items-center mt-6">
              {/* <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={getAllData}>
              शोधा
            </button> */}
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                क्लियर करा
              </button>
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" >
                Export
              </button>
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

export default RedGreenVoter;
