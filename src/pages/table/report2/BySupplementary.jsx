import React, { useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";

const BySupplementary = () => {
const [village,setVillage]=useState('')
const [boothNo,setBoothNo]=useState('')
const [srNo,setSrNo]=useState('')
const [voterName,setVoterName]=useState('')
const [cardNo,setCardNo]=useState('')
const [relative,setRelative]=useState('')
const [relativeName,setReltiveName]=useState('')


  return (
    <div>
        <div className=" mb-4">
      <Card>
        <p>
         
          <span className="font-bold">विधानसभा</span>{" "}
          <span className="font-bold text-lg">199</span>
        </p>
        <div className=" grid grid-cols-4 gap-2">
          <InputGroup
           type="text" 
           label="यादी नं. पासून"
            id="ps-1"
             placeholder="यादी नं. पासून"
              />

          <InputGroup
            type="text"
            label="यादी नं. पर्यंत "
            id="ps-1"
            placeholder="यादी नं. पर्यंत "
          />
          <InputGroup
            type="text"
            label="यादी नं."
            id="ps-1"
            placeholder="यादी नं."
          />

          <Select
            label="प्रकार"
            className="w-full"
            placeholder="सर्व"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
        </div>
        <div className=" flex justify-end items-center mt-6">
            <button className=" bg-orange-400 text-white px-5 h-10 rounded-md ">
              शोधा
            </button>
          </div>
      </Card>
      </div>
      <Card>
        <CommonTable />
      </Card>
    </div>
  );
};

export default BySupplementary;
