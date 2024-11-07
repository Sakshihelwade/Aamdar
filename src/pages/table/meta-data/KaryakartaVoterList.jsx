
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { base_url } from '../../../config/base_url';
import Select, { components } from "react-select";

import Card from '../../../components/ui/Card';

import { MdDelete } from "react-icons/md";

const KaryakartaVoterList = ({handleFamilyModal,familyMember,selectedRowData}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [inputPage, setInputPage] = useState();
  const [allVoter, setAllVoter] = useState([]);
  const [voterCount, setVoterCount] = useState(1);

  const data = allVoter?.length > 0 ? allVoter : [];
  const totalPages = Math.ceil(voterCount?.total / 25);
  const id=localStorage.getItem('_id')
  const [karyakartaVoter,setKaryakartaVoter]=useState([])

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = karyakartaVoter;


  const getKaryakaryaVoter=()=>{
    axios.get(`${base_url}/api/surve/get-karaykarta-Voters/${selectedRowData?._id}`)
    .then((resp)=>{
        console.log(resp.data.voters)
        setKaryakartaVoter(resp.data.voters)
    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const deleteKaryakartaVoter=(id)=>{
    const payload={
        voters:[id]
    }
    axios.post(`${base_url}/api/surve/delete-voters-from-karaykarata/${selectedRowData?._id}`,payload)
    .then((resp)=>{
        console.log(resp.data)
        getKaryakaryaVoter()
    })
    .catch((error)=>{
        console.log(error)
    })
  }


  const handlePageInputChange = (e) => {
    const page = Number(e.target.value);
    if (page > 0 && page <= totalPages) {
      setInputPage(page);
    }
  };

    const handlePageJump = () => {
    if (inputPage > 0 && inputPage <= totalPages) {
      setCurrentPage(inputPage);
      setInputPage('')
    }
  };


useEffect(()=>{
  getKaryakaryaVoter()
},[])



  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setInputPage(currentPage - 1);
  };


  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setInputPage(currentPage + 1);
  };

 


  return (
    <Card>
      <div className="p-1">
     
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-300 text-gray-600 text-sm leading-normal">
              
                <th className="px-1 py-2 border border-gray-300">भाग/बूथ नं</th>
                <th className="px-1 py-2 border border-gray-300">अ.क्र.</th>
                <th className="px-1 py-2 border border-gray-300">नाव</th>
                <th className="px-1 py-2 border border-gray-300">वय</th>
                <th className="px-1 py-2 border border-gray-300">लिंग</th>
                <th className="px-1 py-2 border border-gray-300">मोबाईल नं</th>
                <th className="px-1 py-2 border border-gray-300">नवीन पत्ता</th>
                <th className="px-1 py-2 border border-gray-300">घर नं</th>
                <th className="px-1 py-2 border border-gray-300">पत्ता</th>
                <th className="px-1 py-2 border border-gray-300">कार्ड नं</th>
                <th className="px-1 py-2 border border-gray-300">मुळगाव</th>
                <th className="px-1 py-2 border border-gray-300">कृती</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentRows?.map((row, index) => (
                <tr key={index} className={`odd:bg-gray-100 even:bg-white`}>
               
                  <td className="px-1 py-2 border border-gray-300">{row.boothNo}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.serialNo}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.name}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.age}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.gender}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.MOBILE_NO}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.NEW_ADDRESS}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.houseNo}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.address}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.cardNumber}</td>
                  <td className="px-1 py-2 border border-gray-300">{row.NATIVE_VILLAGE}</td>
                  <td className="px-1 py-2 border border-gray-300 cursor-pointer"  onClick={() => deleteKaryakartaVoter(row._id)}><MdDelete className=' h-6 w-6'/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-2">
          <button
            onClick={handlePrevious}
            className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-md ${currentPage === 1 && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <div className="flex items-center">
            <span>Page No</span>
            <input
              type="text"
              value={inputPage}
              onChange={handlePageInputChange}
              className="border border-gray-300 text-center w-16 mx-2"
            />
            <button
              onClick={handlePageJump}
              className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md"
            >
              Go
            </button>
          </div>

          <span>Page {currentPage} of {totalPages}</span>

          <button
            onClick={handleNext}
            className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </Card>
  );
};

export default KaryakartaVoterList;
