import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for API calls
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import { base_url } from "../../../config/base_url";

const JivantMrut = () => {
  const [minBoothNo, setMinBoothNo] = useState('');
  const [maxBoothNo, setMaxBoothNo] = useState('');
  const [status, setStatus] = useState('');
  const [boothNo, setBoothNo] = useState(''); // Uncomment and use a single value
  const [voterName, setVoterName] = useState('');
  const [villageName, setVillageName] = useState("");
  const [villageId, setVillageId] = useState('');
  const [villageOptions, setVillageOptions] = useState([]);
  const [boothOptions, setBoothOptions] = useState([]);
  const [allVoters, setAllVoters] = useState([]);
  const [voterCount, setVoterCount] = useState(0); // Assuming voter count is a number
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = () => {
    getAllData();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleVillageChange = (e) => {
    const selectedOption = villageOptions.find(option => option.value === e.target.value);
    setVillageId(e.target.value);
    setVillageName(selectedOption?.label || "");
  };

  // Options for the "जिवंत / मृत" select dropdown
  const statusOptions = [
    { label: 'जिवंत', value: '1' },
    { label: 'मृत', value: '2' },
  ];

  // Fetch village options from API
  const getVillageOptions = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages`)
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
    axios.get(`${base_url}/api/surve/getSortBooth?villageId=${villageId}`)
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
      const response = await axios.get(`${base_url}/api/surve/searchVotter?name=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${minBoothNo}&maxBooth=${maxBoothNo}&aliveOrDead=${status}&nameFilter=${voterName}`);
      setAllVoters(response.data.voters);
      setVoterCount(response.data || 0); 
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [currentPage]);

  useEffect(() => {
      getBoothNo();
  }, [villageId]);

  useEffect(() => {
    getVillageOptions();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <Card>
        <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-orange-400">जिवंत / मृत  </h6>
            <p className=" flex">
              <h6 className="font-bold text-orange-400 text-lg">Total : </h6>  <h6 className="font-bold text-orange-400 text-lg"> {voterCount?.total}</h6>
              </p>
          </div>
          <hr className="mb-3"/>
          <p>
            <span className="font-bold">विधानसभा</span>{" "}
            <span className="font-bold text-lg">199</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
            <Select
              label="गाव"
              className="w-full"
              placeholder="गाव"
              value={villageId} // Use villageId as value
              options={villageOptions} // Ensure options are passed correctly
              onChange={handleVillageChange}
            />

            {/* Booth Number */}
            <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              value={boothNo} // Bind the selected booth number
              options={boothOptions} // Ensure options are passed correctly
              onChange={(e) => setBoothNo(e.target.value)} // Set booth number
            />

            <InputGroup
              type="text"
              label="यादी नं. पासून"
              id="ps-1"
              placeholder="यादी नं. पासून"
              value={minBoothNo}
              onChange={(e) => setMinBoothNo(e.target.value)}
            />

            <InputGroup
              type="text"
              label="यादी नं. पर्यंत"
              id="ps-2"
              placeholder="यादी नं. पर्यंत"
              value={maxBoothNo}
              onChange={(e) => setMaxBoothNo(e.target.value)}
            />

            <Select
              label="जिवंत / मृत"
              className="w-full"
              placeholder="Select"
              value={status}
              onChange={(e) => setStatus(e)}
              options={statusOptions}
            />

            <InputGroup
              type="text"
              label="मतदाराचे नाव"
              id="ps-4"
              placeholder="मतदाराचे नाव"
              value={voterName}
              onChange={(e) => setVoterName(e.target.value)}
            />

            <span className="mt-10">एकूण : {voterCount?.total}</span>

            <div className="flex justify-end items-center mt-6">
              <button
                className="bg-orange-400 text-white px-5 h-10 rounded-md"
                onClick={handleSearch}
              >
                शोधा
              </button>
            </div>
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
