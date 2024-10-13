import React, { useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import YadiCommitteeTable from "./YadiCommitteeTable";

const YadiCommittee = () => {
  const [village, setVillage] = useState('')
  const [boothNo, setBoothNo] = useState('')
  const [srNo, setSrNo] = useState('')
  const [voterName, setVoterName] = useState('')
  const [cardNo, setCardNo] = useState('')
  const [relative, setRelative] = useState('')
  const [relativeName, setReltiveName] = useState('')


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
              label="नाव"
              className="w-full"
              placeholder="नाव"
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
              label="मतदान केंद्र"
              className="w-full"
              placeholder="मतदान केंद्र"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
            />
            <InputGroup
              type="text"
              label="पत्ता"
              id="ps-1"
              placeholder="पत्ता"
            />
            
            <Select
              label="पद"
              className="w-full"
              placeholder="Select"
            //   options={options}
            //   onChange={handleChange}
            //   value={value}
            />
            <span></span>
            <span></span>

            <div className=" flex justify-end items-center mt-6">
              <button className=" bg-orange-400 text-white px-5 h-10 rounded-md ">
                शोधा
              </button>
            </div>
          </div>
        </Card>
      </div>
      <Card>
        <YadiCommitteeTable />
      </Card>
    </div>
  );
};

export default YadiCommittee;
