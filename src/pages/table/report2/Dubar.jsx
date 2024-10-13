import React, { useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import DubarTable1 from "./DubarTable1";

const Dubar = () => {
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
                        एकूण दुबार :
                    </div>
                </Card>
            </div>
            <Card>
                <div className="grid grid-cols-12 ">
                    <div className="col-span-4 m-2"><DubarTable1/></div>
                    <div className="col-span-8 m-2"><CommonTable /></div>
                </div>
            </Card>
        </div>
    );
};

export default Dubar;
