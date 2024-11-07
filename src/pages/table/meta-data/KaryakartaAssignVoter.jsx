
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { base_url } from '../../../config/base_url';
import Select, { components } from "react-select";

import Card from '../../../components/ui/Card';
import InputGroup from "@/components/ui/InputGroup";
import { fromJSON } from 'postcss';
import { toast } from 'react-toastify';

const KaryakartaAssignVoter = ({handelSetData,handleFamilyModal,familyMember,handleSelectedFiler,selectedRowData}) => {
    const [villageId, setVillageId] = useState("");
    const [villageName, setVillageName] = useState("");
    const [boothNo, setBoothNo] = useState("");
    const [fromList, setFromList] = useState("");
    const [toList, setToList] = useState("");
 const [selectAllVoter,setSelectAllVoter]=useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [inputPage, setInputPage] = useState();
  const [allVoter, setAllVoter] = useState([]);
  const [voterCount, setVoterCount] = useState();
  const [errors, setErrors] = useState({});
  const [selectedRows, setSelectedRows] = useState([]); 
  const [villageOption, setVillageOption] = useState([]);
  const [boothOption,setBoothOption]=useState([])
  const data = allVoter?.length > 0 ? allVoter : [];
  const totalPages = Math.ceil(voterCount?.total / 25);
  const id=localStorage.getItem('_id')
  const [selectedFilter,setSelectedFilter]=useState([])

  const idArray = selectedRows?.map(voter => voter._id);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = data;

useEffect(()=>{
    handelSetData(selectedRows)
})

handleSelectedFiler(selectedFilter)

const handleVillageChange = (selectedOption) => {
    setVillageId(selectedOption?.value || "");
    setVillageName(selectedOption?.label || "");
    setErrors({ ...errors, village: "" })
  };

  const validateFields = () => {
    let validationErrors = {};
    if ((fromList || toList) && (!villageId || !boothNo)) {
      validationErrors.village = "यादी नं. पासून किंवा यादी नं. पर्यंत प्रविष्ट करत असल्यास कृपया गाव आणि बूथ निवडा.";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = () => {
    // if (validateFields()) {
        postAssignKaryakarta()
     
    // }
  };

  const getVillageOption = () => {
    axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
      .then((resp) => {
        const villageoption = resp.data.village.map((item) => ({
          label: item.name,
          value: item._id
        }));
        setVillageOption(villageoption);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBoothNo=()=>{
    axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
    .then((resp)=>{
        const boothNo=resp.data.booths.map((item)=>({
            label:item.boothNo , value:item.boothNo
        }))
        setBoothOption(boothNo)

    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const getAllVoters = () => {
    axios
      .get(`${base_url}/api/surve/searchVotter/${id}?name=true&village=${villageName}&boothNo=${boothNo}&page=${currentPage}`)
      .then((resp) => {
        console.log(resp.data,"////////")
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

  const postAssignKaryakarta = () =>{
const payload = selectAllVoter ? 
    {
        village: villageName,
        boothNo: boothNo,
        // minBooth: fromList,
        // maxBooth: toList
    }
     :
     {
        karyakartaId: selectedRowData?._id,
         karyakartaName: selectedRowData?.fullName,
         voters: idArray
    }
     
    axios.post(`${base_url}/api/surve/assignVoters`,payload)
    .then((resp)=>{
        console.log(resp)
        toast.success('Assign Voter Sucessfully')
    handleClear()
        handleFamilyModal(false); 
    })
    .catch((error)=>{
        console.log(error)
    })
}

  useEffect(()=>{
    setSelectedFilter({
        villageName,
        boothNo,
       
    })
  },[villageName,boothNo])

  useEffect(()=>{
    getBoothNo()
 },[villageName])

useEffect(()=>{
    getVillageOption()
},[])

  useEffect(() => {
    if (villageName || boothNo 
        // || fromList || toList
    ) {
        getAllVoters();
      }
  }, [currentPage, villageName, boothNo]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setInputPage(currentPage - 1);
  };

  const handleClear = () => {
 setVillageId('')
 setVillageName('')
 setBoothNo('')
 setFromList('')
 setToList('')
 setAllVoter([])
 setSelectedRows([])
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




  return (
    <Card>
      <div className="p-1">
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-2'>
        <div>
            <label className="form-label" htmlFor="mul_1">गाव</label>
            <Select
              placeholder="गाव"
              name="गाव"
              value={villageOption.find(option => option.value === villageId) || null}
              options={villageOption}
              onChange={handleVillageChange}
              className="react-select"
              classNamePrefix="select"
            />
          </div>

          <div>
            <label className="form-label" htmlFor="mul_1">भाग/बूथ नं</label>
            <Select
              placeholder="भाग/बूथ नं"
              name="भाग/बूथ नं"
              value={boothOption.find(option => option.value === boothNo) || null}
              options={boothOption}
              onChange={(selectedOption) => {
                setBoothNo(selectedOption?.value || null);
                // setErrors({ ...errors, village: "" }); // Clear error
              }}
              className="react-select"
              classNamePrefix="select"
            />
          </div>

          {/* <InputGroup
            type="text"
            label="यादी नं. पासून"
            id="ps-1"
            placeholder="यादी नं. पासून"
            value={fromList}
            onChange={(e) => setFromList(e.target.value)}
          />
          <InputGroup
            type="text"
            label="यादी नं. पर्यंत"
            id="ps-1"
            placeholder="यादी नं. पर्यंत"
            value={toList}
            onChange={(e) => setToList(e.target.value)}
          /> */}
          <div className='flex gap-2 justify-end'>
            <button className="bg-[#b91c1c] text-white px-5 h-10 mt-8 rounded-md" onClick={handleClear}>
              Clear
            </button>
            <button className="bg-[#b91c1c] text-white px-5 h-10 mt-8 rounded-md" onClick={handleSubmit}>
              Submit
            </button>
          </div>

        </div>
        <div className='flex gap-5'>
        <div className=' flex justify-start gap-2'>
        <input type="checkbox" id="selectAll"  onClick={()=>setSelectAllVoter(!selectAllVoter)} />
  <label htmlFor="selectAll">Select All</label>
  </div> 
        {/* {errors.village && <span className="text-red-500 text-[16px]">{errors.village}</span>} */}
       
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-300 text-gray-600 text-sm leading-normal">
                {/* Add Select All checkbox in the header */}
                <th className="px-1 py-2 border border-gray-300">
                  {/* <input type="checkbox" onChange={handleSelectAll} /> */}
                </th>
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

export default KaryakartaAssignVoter;
