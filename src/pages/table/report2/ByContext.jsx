import React, { useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";

const ByContext = () => {
    const [village, setVillage] = useState('')
    const [boothNo, setBoothNo] = useState('')
    const [srNo, setSrNo] = useState('')
    const [voterName, setVoterName] = useState('')
    const [cardNo, setCardNo] = useState('')
    const [relative, setRelative] = useState('')
    const [relativeName, setReltiveName] = useState('')
    const [isSelected1, setIsSelected1] = useState(false);  // checkbox state 1
    const [isSelected2, setIsSelected2] = useState(false);  // checkbox state 2

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
                            type="date"
                            label="संदर्भ"
                            id="ps-1"
                            placeholder="संदर्भ"
                        />
                        {/* <div className="col-span-1 flex mt-8 gap-2 items-center ml-24">
                            <input
                                type="checkbox"
                                checked={isSelected1}
                                onChange={() => setIsSelected1(!isSelected1)}
                                className="form-checkbox"
                            />
                            <label className="ml-2">Monthwise</label></div>

                        <div className="col-span-2 flex mt-8 items-center">
                            <input
                                type="checkbox"
                                checked={isSelected2}
                                onChange={() => setIsSelected2(!isSelected2)}
                                className="form-checkbox"
                            />
                            <label className="ml-2">Show All</label>
                        </div> */}
                        <div className=" col-span-3 justify-end items-center mt-8">
                            <button className=" bg-orange-400 text-white px-5 h-10 rounded-md ">
                                Export
                            </button>
                        </div>
                        <div className="col-span-1 flex mt-8 items-center"><span>पुरुष : 12345</span></div>
                        <div className="col-span-1 flex mt-8 items-center"><span>स्त्री : 123456</span></div>
                        <div className="col-span-1 flex mt-8 items-center"><span>एकूण : 123456</span></div>


                    </div>
                    {/* <div className="col-span-2 flex mt-8 gap-2 items-center ml-24">
                            <input
                                type="checkbox"
                                checked={isSelected1}
                                onChange={() => setIsSelected1(!isSelected1)}
                                className="form-checkbox"
                            />
                            <label className="ml-2">Monthwise</label>

                            <input
                                type="checkbox"
                                checked={isSelected2}
                                onChange={() => setIsSelected2(!isSelected2)}
                                className="form-checkbox"
                            />
                            <label className="ml-2">Show All</label>

                            <span>पुरुष :</span>
                        <span>स्त्री :</span>
                        <span>एकूण :</span>
                        </div> */}
                </Card>
            </div >
            <Card>
                <CommonTable />
            </Card>
        </div >
    );
};

export default ByContext;
