import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const ByMarriageAnniversary = () => {

    const [date,setDate]=useState(new Date())
    const [allVoter,setAllVoter]=useState('')
    const [voterCount,setVoterCount]=useState()
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    const getAllVoters = () => {
        axios.get(`${base_url}/api/surve/searchVotter?name=true&page=${currentPage}`)
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

useEffect(()=>{
    getAllVoters()
},[currentPage])

    return (
        <div>
            <div className=" mb-4">
                <Card>
                <div className="mb-2">
            <h6 className="font-bold text-orange-400">लग्नाचा वाढदिवस </h6>
          </div>
          <hr className="py-2" />
                    <p>

                        <span className="font-bold">विधानसभा</span>{" "}
                        <span className="font-bold text-lg">199</span>
                    </p>
                    <div className=" grid grid-cols-4 gap-2">
                        <InputGroup
                            type="date"
                            label="लग्नाचा वाढदिवस"
                            id="ps-1"
                            placeholder="लग्नाचा वाढदिवस"
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                        />
                    
                        <div className=" col-span-3 justify-end items-center mt-8">
                            <button className=" bg-orange-400 text-white px-5 h-10 rounded-md ">
                                Export
                            </button>
                        </div>
                        <div className="col-span-1 flex mt-8 items-center"><span>पुरुष : 12345</span></div>
                        <div className="col-span-1 flex mt-8 items-center"><span>स्त्री : 123456</span></div>
                        <div className="col-span-1 flex mt-8 items-center"><span>एकूण : 123456</span></div>


                    </div>
                   
                </Card>
            </div >
            <Card>
            <CommonTable  Props={allVoter} voterCount={voterCount}   
   onPageChange={handlePageChange}/>
            </Card>
        </div >
    );
};

export default ByMarriageAnniversary;
