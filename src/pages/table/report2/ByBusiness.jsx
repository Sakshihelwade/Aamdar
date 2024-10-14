import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const ByBusiness = () => {
  const [villageId, setVillageId] = useState("");
  const [villageName, setVillageName] = useState("");
  const [boothNo, setBoothNo] = useState("");
  const [fromList, setFromList] = useState("");
  const [toList, setToList] = useState("");
  const [business, setBusiness] = useState("");
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption,setBoothOption]=useState([])
  const [allVoter,setAllVoter]=useState([])
  const [voterCount,setVoterCount]=useState()
  const [currentPage, setCurrentPage] = useState(1);


  const handleVillageChange = (e) => {
    const selectedOption = villageOption.find(option => option.value === e.target.value);
    setVillageId(e.target.value); 
    setVillageName(selectedOption?.label || ""); 
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getVillageOption = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages`)
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

  const getBoothNo=()=>{
    axios.get(`${base_url}/api/surve/getSortBooth?villageId=${villageId}`)
    .then((resp)=>{
        const boothNo=resp.data.booths.map((item)=>({
            label:item.boothNo , value:item._id
        }))
        setBoothOption(boothNo)

    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const getAllVoters = () => {
    axios
      .get(`${base_url}/api/surve/searchVotter?name=true&boothNo=${boothNo}&village=${villageName}&minBooth=${fromList}&maxBooth=${toList}&page=${currentPage}`)
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

  useEffect(() => {
    getVillageOption();
    getAllVoters()
    }, []);

 useEffect(()=>{
    getBoothNo()
 },[villageId])


return (
    <div>
        <div className=" mb-4">
      <Card>
      <div className="mb-2">
            <h6 className="font-bold text-orange-400">व्यवसायानुसार</h6>
          </div>
          <hr className="py-2" />

        <p>
         
          <span className="font-bold">विधानसभा</span>{" "}
          <span className="font-bold text-lg">199</span>
        </p>
        <div className=" grid grid-cols-4 gap-2">
        <Select
              label="गाव"
              className="w-full"
              placeholder="गाव"
              value={villageId}
              options={villageOption}
              onChange={handleVillageChange} 
            />
            <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              options={boothOption}
              onChange={(e) =>setBoothNo(e.target.value)}
              value={boothNo}
            />
          <InputGroup
           type="text" 
           label="यादी नं. पासून"
            id="ps-1"
             placeholder="यादी नं. पासून"
             onChange={(e) =>setFromList(e.target.value)}
              value={fromList}
              />

          <InputGroup
            type="text"
            label="यादी नं. पर्यंत "
            id="ps-1"
            placeholder="यादी नं. पर्यंत "
            onChange={(e) =>setToList(e.target.value)}
              value={toList}
          />

          <Select
            label="व्यवसाय"
            className="w-full"
            placeholder="सर्व"
            //   options={options}
              onChange={(e)=>setBusiness(e.target.value)}
              value={business}
          />
           {/* <InputGroup
            type="text"
            label="यादी नं."
            id="ps-1"
            placeholder="यादी नं."
          /> */}
          एकूण मतदार : 111111
          <span></span>
          <span></span>
         
        </div>
        <div className="flex  justify-end items-center ">
            <button className=" bg-orange-400 text-white px-5 h-10 rounded-md " onClick={getAllVoters}>
              शोधा
            </button>
          </div>
      </Card>
      </div>
      <Card>
        <CommonTable Props={allVoter} voterCount={voterCount} onPageChange={handlePageChange}/>
      </Card>
    </div>
  );
};

export default ByBusiness;
