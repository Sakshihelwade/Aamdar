import React, { useEffect, useState } from "react";
import CommonTable from "../react-tables/CommonTable";
import Card from "../../../components/ui/Card";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import DubarTable1 from "./DubarTable1";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../../../config/base_url";

const Dubar = () => {
  
    const [allVoter,setAllVoter]=useState('')
    const [voterCount,setVoterCount]=useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [dubarVoter,setDubarVoter]=useState([])
  const [dubarVoterCount,setDubarVoterCount]=useState()

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

   const getDubarVoter=()=>{
    axios.get(`${base_url}/api/surve/searchVotter?duplicateNamesWeb=true&page=${currentPage}`)
    .then((resp)=>{
        setDubarVoter(resp.data.duplicates)
        setDubarVoterCount(resp.data)
    })
    .catch((error)=>{
        console.log(error)
    })
   }   

useEffect(()=>{
    getAllVoters()
},[currentPage])

useEffect(()=>{
    getDubarVoter()
},[])

    return (
        <div>
            <div className=" mb-4">
                <Card>
                <div className="mb-2">
            <h6 className="font-bold text-orange-400">दुबार </h6>
          </div>
          <hr className="py-2" />
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
                <div className=" grid grid-cols-12">
                    <div className="col-span-4 m-2">
                        <DubarTable1 Props={dubarVoter} voterCount={dubarVoterCount}/>
                        </div>
                    <div className="col-span-8 m-2">
                        <CommonTable  Props={allVoter} voterCount={voterCount}   
   onPageChange={handlePageChange}/>
   </div>
                </div>
            </Card>
        </div>
    );
};

export default Dubar;
