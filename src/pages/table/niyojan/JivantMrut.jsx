import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming axios is used for API calls
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import { base_url } from "../../../config/base_url";

const JivantMrut = () => {
  const id = localStorage.getItem('_id')
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

  const totalmalefemale=voterCount?.maleCount + voterCount?.femaleCount
  const other=voterCount?.total - totalmalefemale || 0
  
  // const handleSearch = () => {
  //   getAllData();
  // };
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
    { label: 'जिवंत', value: 'Alive' },
    { label: 'मृत', value: 'Dead' },
  ];

  // Fetch village options from API
  const getVillageOptions = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
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
      const response = await axios.get(`${base_url}/api/surve/searchVotter/${id}?name=true&boothNo=${boothNo}&village=${villageName}&page=${currentPage}&minBooth=${minBoothNo}&maxBooth=${maxBoothNo}&aliveOrDead=${status}&nameFilter=${voterName}`);
      setAllVoters(response.data.voters);
      setVoterCount(response.data || 0);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllData();
  }, [currentPage, boothNo, villageId, minBoothNo, maxBoothNo, voterName, status]);

  useEffect(() => {
    getBoothNo();
  }, [villageId]);

  useEffect(() => {
    getVillageOptions();
  }, []);

  const clearFields = () => {
    setVillageId('');
    setVillageName('');
    setBoothNo('');
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
              value={boothNo}
              options={boothOptions} // Ensure options are passed correctly
              onChange={(e) => setBoothNo(e.target.value)} // Set booth number
            />

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

            <Select
              label="जिवंत / मृत"
              className="w-full"
              placeholder="Select"
              value={status}
              onChange={(e) => setStatus(e.target.value)} // Get the value from the event
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

            {/* <span className="mt-10">एकूण : {voterCount?.total}</span> */}
            <span></span>
            <div className="flex justify-end items-center mt-6">
              {/* <button
                className="bg-[#b91c1c] text-white px-5 h-10 rounded-md"
                onClick={handleSearch}
              >
                शोधा
              </button> */}
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                क्लियर करा
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
