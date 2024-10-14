import React, { useState } from "react";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import MasterMobTable from "./MasterMobTable";
import SurveyRegTable from "./SurveyRegTable";
import SurveyDataViewTable from "./SurveyDataViewTable";

const SurveyDataView = () => {
    const [village, setVillage] = useState('')
    const [boothNo, setBoothNo] = useState('')
    const [srNo, setSrNo] = useState('')
    const [voterName, setVoterName] = useState('')
    const [cardNo, setCardNo] = useState('')
    const [relative, setRelative] = useState('')
    const [relativeName, setReltiveName] = useState('')

    return (
        <div>
            <div className="mb-4">
                <Card>
                    <div className="mb-2">
                        <h6 className="font-bold text-orange-400">सर्वे डेटा पाहणे  </h6>
                    </div>
                    <hr className="py-2" />
                    <p>
                        <span className="font-bold">विधानसभा</span> :
                        <span className="font-bold text-lg">199</span>
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                        <InputGroup
                            type="text"
                            label="सर्वेअरचे नाव"
                            id="ps-1"
                            placeholder="सर्वेअरचे नाव"
                        />
                        <div className=" col-span-3 flex  gap-4 justify-start items-center  mt-8">
                            <button className=" bg-orange-400 text-white px-5 h-10 rounded-md ">
                                Get Info
                            </button>
                        </div>
                        <span>एकूण दिवस : </span>
                        <span>एकूण रेकॉर्ड : </span>
                    </div>
                </Card>
            </div>
            <Card>
                <SurveyDataViewTable />
            </Card>
        </div>
    );
};

export default SurveyDataView;
