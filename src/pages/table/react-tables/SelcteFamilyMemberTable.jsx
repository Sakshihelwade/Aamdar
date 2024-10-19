
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { base_url } from '../../../config/base_url';
import Card from '../../../components/ui/Card';
import InputGroup from "@/components/ui/InputGroup";

const SeleteFamilyMemberTable = ({handelSetData,handleFamilyModal,familyMember}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [inputPage, setInputPage] = useState();
  const [allVoter, setAllVoter] = useState([]);
  const [voterCount, setVoterCount] = useState();
  const [village, setVillage] = useState('');
  const [voterName, setVoterName] = useState("");
  const [surname, setSurName] = useState("");
  const [selectedRows, setSelectedRows] = useState([]); 
console.log(selectedRows,"selectedRows")
  const data = allVoter?.length > 0 ? allVoter : [];
  const totalPages = Math.ceil(voterCount?.total / 25);
  const id=localStorage.getItem('_id')

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = data;
useEffect(()=>{
    handelSetData(selectedRows)
})
  const getAllVoters = () => {
    axios
      .get(`${base_url}/api/surve/searchVotter/${id}?address=true&lastNameFilter=${surname}&nameFilter=${voterName}&page=${currentPage}`)
      .then((resp) => {
        console.log(resp.data.voters)
        setAllVoter(resp.data.voters);
        setVoterCount(resp.data);
      })
      .catch((error) => {
        console.log(error);
        toast.warning('No results found for the provided search criteria');
      });
  };
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
  useEffect(() => {
    getAllVoters();
  }, [currentPage, village, voterName, surname]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setInputPage(currentPage - 1);
  };

  const handleClear = () => {
    setSurName('');
    setVoterName('');
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setInputPage(currentPage + 1);
  };

  const handleRowSelection = (row) => {
    if (selectedRows.includes(row)) {
      // If row is already selected, deselect it
      setSelectedRows(selectedRows.filter(selectedRow => selectedRow !== row));
    } else {
      // Otherwise, add it to the selected rows
      setSelectedRows([...selectedRows, row]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      // If checked, select all rows
      setSelectedRows(currentRows);
    } else {
      // If unchecked, clear selection
      setSelectedRows([]);
    }
  };

  console.log(familyMember,currentRows,"familyMember")

  return (
    <Card>
      <div className="p-1">
        <div className='grid grid-cols-4 gap-2 mb-2'>
          <InputGroup
            type="text"
            label="मतदाराचे नाव"
            id="ps-1"
            placeholder="मतदाराचे नाव"
            value={voterName}
            onChange={(e) => setVoterName(e.target.value)}
          />
          <InputGroup
            type="text"
            label="आडनाव"
            id="ps-2"
            placeholder="आडनाव"
            value={surname}
            onChange={(e) => setSurName(e.target.value)}
          />
          <div></div>
          <div className=' flex gap-2 justify-end'>
            <button className="bg-[#b91c1c] text-white px-5 h-10 mt-8 rounded-md" onClick={handleClear}>
              Clear
            </button>
            <button className="bg-[#b91c1c] text-white px-5 h-10 mt-8 rounded-md" onClick={()=>handleFamilyModal(false)}>
              Submit
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-300 text-gray-600 text-sm leading-normal">
                {/* Add Select All checkbox in the header */}
                <th className="px-1 py-2 border border-gray-300">
                  <input type="checkbox" onChange={handleSelectAll} />
                </th>
                <th className="px-1 py-2 border border-gray-300">भाग/बूथ नं</th>
                <th className="px-1 py-2 border border-gray-300">अ.नं.</th>
                <th className="px-1 py-2 border border-gray-300">नाव</th>
                <th className="px-1 py-2 border border-gray-300">वय</th>
                <th className="px-1 py-2 border border-gray-300">लिंग</th>
                <th className="px-1 py-2 border border-gray-300">मोबाईल नं</th>
                <th className="px-1 py-2 border border-gray-300">नवीन पत्ता</th>
                <th className="px-1 py-2 border border-gray-300">घर नं</th>
                <th className="px-1 py-2 border border-gray-300">पत्ता</th>
                <th className="px-1 py-2 border border-gray-300">कार्ड नं</th>
                <th className="px-1 py-2 border border-gray-300">मुळगाव</th>
                <th className="px-1 py-2 border border-gray-300">स्टेटस</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {currentRows.map((row, index) => (
                <tr key={index} className={`odd:bg-gray-100 even:bg-white`}>
                  {/* Add a checkbox for each row */}
                  <td className="px-1 py-2 border border-gray-300">
                    <input
                      type="checkbox"
                        checked={selectedRows.includes(row)}
                       
                      onChange={() => handleRowSelection(row)}
                     
                    />
                  </td>
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
                  <td className="px-1 py-2 border border-gray-300">{row.STATUS}</td>
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

export default SeleteFamilyMemberTable;
