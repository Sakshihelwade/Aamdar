import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
// import Select from "@/components/ui/Select";
import Select, { components } from "react-select";
import { date } from "yup";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const NameWiseList = () => {
  const id = localStorage.getItem('_id')
  const [month, setMonth] = useState('');
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");
  const [allVoter, setAllVoter] = useState('')
  const [voterCount, setVoterCount] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption, setBoothOption] = useState([])

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
  
  const getVillageOption = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
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

  const getBoothNo = () => {
    axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
      .then((resp) => {
        const boothNo = resp.data.booths.map((item) => ({
          label: item.boothNo, value: item.boothNo
        }))
        setBoothOption(boothNo)

      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getAllVoters = () => {
    axios.get(`${base_url}/api/surve/searchVotter/${id}?name=true&village=${villageName}&boothNo=${boothNo}&page=${currentPage}`)
      .then((resp) => {
        setAllVoter(resp.data.voters);
        setVoterCount(resp.data);
        toast.success('Filter Sucessfully')
      })
      .catch((error) => {
        console.log(error);
        toast.warning('No results found for the provided search criteria')
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    getVillageOption()
  }, [])

  useEffect(() => {
    getBoothNo()
  }, [villageId])

  useEffect(() => {
    getAllVoters()
  }, [currentPage, villageName, boothNo])

  const monthOption = [
    { label: "आज", value: "आज" },
    { label: "जानेवारी", value: "जानेवारी" },
    { label: "फेब्रुवारी", value: "फेब्रुवारी" },
    { label: "मार्च", value: "मार्च" },
    { label: "एप्रिल", value: "एप्रिल" },
    { label: "मे", value: "मे" },
    { label: "जून", value: "जून" },
    { label: "जुलै", value: "जुलै" },
    { label: "ऑगस्ट", value: "ऑगस्ट" },
    { label: "सप्टेंबर", value: "सप्टेंबर" },
    { label: "ऑक्टोबर", value: "ऑक्टोबर" },
    { label: "नोव्हेंबर", value: "नोव्हेंबर" },
    { label: "डिसेंबर", value: "डिसेंबर" },

  ]

  const clearFields = () => {
    setVillageId('');
    setVillageName('');
    setBoothNo('');
    getAllVoters();
  }
  return (
    <div>
      <div className=" mb-4">
        <Card>
          <div className="mb-2 flex justify-between">
            <h6 className="font-bold text-[#b91c1c]">जन्मतारखेनुसार </h6>
            <p className=" flex gap-6">
              <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
              <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
              <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
              <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
            </p>
          </div>
          <hr className="py-2" />
          <p>
            <span className="font-bold">विधानसभा</span>{" "}
            <span className="font-bold text-lg">199</span>
          </p>
          <div className=" grid grid-cols-4 gap-2">
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
            {/* <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              options={boothOption}
              onChange={(e) => setBoothNo(e.target.value)}
              value={boothNo}
            /> */}
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

            {/* <Select
              label="महिना निवडा"
              className="w-full"
              placeholder="महिना निवडा"
              options={monthOption}
              onChange={(e) => setMonth(e.target.value)}
              value={month}
            /> */}
            {/* <div></div>
<div className=" flex  gap-7 ">
            <div className="col-span-1 flex mt-8 items-center">
              <span className=" font-semibold"> पुरुष : 12345</span>
            </div>
            <div className="col-span-1 flex mt-8 items-center">
              <span className=" font-semibold">स्त्री : 123456</span>
            </div>
          
            </div>
            <div className="col-span-1 flex mt-8 items-center">
              <span className=" font-semibold">एकूण : {voterCount?.total}</span>
            </div> */}
            <div className=" flex justify-start items-center mt-6">
              <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                क्लियर करा
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

export default NameWiseList;
