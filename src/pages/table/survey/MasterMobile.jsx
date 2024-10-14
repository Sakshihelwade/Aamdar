import React, { useState } from "react";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import MasterMobTable from "./MasterMobTable";

const MasterMobile = () => {
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
                        <h6 className="font-bold text-orange-400">मास्टर मोबाईल</h6>
                    </div>
                    <hr className="py-2" />
                    <p>
                        <span className="font-bold">विधानसभा</span> :
                        <span className="font-bold text-lg">199</span>
                    </p>
                    <div className="grid grid-cols-4 gap-2">
                        <InputGroup
                            type="text"
                            label="नाव"
                            id="ps-1"
                            placeholder="नाव"
                        // value={buildingAreaName}
                        // onChange={(e) => setBuildingAreaName(e.target.value)}
                        />
                        <InputGroup
                            type="text"
                            label="मोबाईल नं."
                            id="ps-1"
                            placeholder="मोबाईल नं."
                        // value={buildingAreaName}
                        // onChange={(e) => setBuildingAreaName(e.target.value)}
                        />
                        <InputGroup
                            type="text"
                            label="EMEI"
                            id="ps-1"
                            placeholder="EMEI"
                        // value={buildingAreaName}
                        // onChange={(e) => setBuildingAreaName(e.target.value)}
                        />
                        <Select
                            label="स्टेटस"
                            className="w-full"
                            placeholder="स्टेटस"
                        // value={villageId}
                        // options={villageOption}
                        // onChange={handleVillageChange}
                        />
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className="flex justify-end items-center mt-6">
                            <button className="bg-orange-400 text-white px-5 h-10 rounded-md" onClick={(e) => {
                                handleClear()
                                getAllVoters()
                            }

                            }>
                                शोधा
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
            <Card>
                <MasterMobTable />
            </Card>
        </div>
    );
};

export default MasterMobile;
