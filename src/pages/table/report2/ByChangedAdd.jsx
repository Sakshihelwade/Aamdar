import React, { useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";

const ByChangedAdd = () => {
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
            label="नगर"
            className="w-full"
            placeholder="नगर"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
          <InputGroup
           type="text" 
           label="नवीन पत्ता
"
            id="ps-1"
             placeholder="नवीन पत्ता
"
              />
          <Select
            label="सोसायटी"
            className="w-full"
            placeholder="सोसायटी"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
          <Select
            label="घराचा प्रकार"
            className="w-full"
            placeholder="घराचा प्रकार"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
          <InputGroup
            type="text"
            label="नवीन घर क्र."
            id="ps-1"
            placeholder="नवीन घर क्र."
          />
           <InputGroup
            type="text"
            label="मतदाराचे नाव"
            id="ps-1"
            placeholder="मतदाराचे नाव"
          />
          <Select
            label="प्रकार"
            className="w-full"
            placeholder="प्रकार"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
           <InputGroup
            type="text"
            label="मोबाईल नं"
            id="ps-1"
            placeholder="मोबाईल नं"
          />
          <Select
            label="सर्वे"
            className="w-full"
            placeholder="सर्वे"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
          />
          <div className=" flex  items-center mt-6">
          एकूण मतदार :
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

export default ByChangedAdd;
