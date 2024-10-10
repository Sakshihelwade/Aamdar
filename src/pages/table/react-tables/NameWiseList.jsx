import React, { useState } from "react";
import CommonTable from "./CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";

const NameWiseList = () => {
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
          <Select
            label="गाव"
            className="w-full"
            placeholder="गाव"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
          <Select
            label="भाग/बूथ नं"
            className="w-full"
            placeholder="भाग/बूथ नं"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
          <InputGroup
           type="text" 
           label="अ.नं."
            id="ps-1"
             placeholder="अ.नं."
              />

          <InputGroup
            type="text"
            label="मतदाराचे नाव "
            id="ps-1"
            placeholder="मतदाराचे नाव "
          />
          <InputGroup
            type="text"
            label="EPIC/कार्ड नं"
            id="ps-1"
            placeholder="EPIC/कार्ड नं"
          />
          <Select
            label="नातेसंबंधानुसार शोधा"
            className="w-full"
            placeholder="नातेसंबंधानुसार शोधा"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
          <InputGroup
            type="text"
            label="नातेदराचे नाव"
            id="ps-1"
            placeholder="नातेदराचे नाव"
          />
          <div className=" flex justify-end items-center mt-6">
            <button className=" bg-orange-400 text-white px-5 h-10 rounded-md ">
              शोधा
            </button>
          </div>
        </div>
      </Card>
      </div>
      <Card>
        <CommonTable />
      </Card>
    </div>
  );
};

export default NameWiseList;
