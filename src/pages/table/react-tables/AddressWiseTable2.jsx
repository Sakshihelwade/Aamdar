import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { base_url } from '../../../config/base_url';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card';
import { IoMdArrowBack } from "react-icons/io";
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import Modal from '../../../components/ui/Modal';

const AddressWiseTable2 = ({ }) => {
    const navigate=useNavigate()
//   console.log(Props, "//")
const location = useLocation();
const { address } = location.state || {};

  const [activeModal, setActiveModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [inputPage, setInputPage] = useState();
  const [allVoter,setAllVoter]=useState([])
  const [voterCount,setVoterCount]=useState()
  const [village,setVillage]=useState('')
  const id=localStorage.getItem('_id')
  const totalmalefemale=voterCount?.maleCount + voterCount?.femaleCount
  const other=voterCount?.total - totalmalefemale || 0
  const [selectedRow,setSelectedRow]=useState()
  const [activeViewModal,setActiveViewModal]=useState(false)
  const data = allVoter?.length > 0 ? allVoter : [];
  const totalPages = Math.ceil(voterCount?.total / 25);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = data;

  const getAllVoters = () => {
    axios
      .get(`${base_url}/api/surve/searchVotter/${id}?address=true&village=${address}&page=${currentPage}`)
      .then((resp) => {
   
        setAllVoter(resp.data.voters);
        setVoterCount(resp.data);
      })
      .catch((error) => {
        console.log(error);
        toast.warning('No results found for the provided search criteria')
      });
  };
  useEffect(() => {
    getAllVoters();
  }, [currentPage, village, address]);  // Add any state that should trigger the call when changed
  

//   useEffect(() => {
//     if (onPageChange) {
//       onPageChange(currentPage);
//     }
//   }, [currentPage, onPageChange, currentRows]);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    setInputPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    setInputPage(currentPage + 1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1);
    setInputPage(1);
  };

  const handleRowClick = (row) => {
    setSelectedRowData(row);
    setActiveModal(true);
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

  return (
    <Card>
    <div className="p-1">
      <div className=' flex justify-between'>
        <p className=' flex gap-2 items-center pb-2'>
            <button className=' bg-blue-300 px-1 flex justify-center items-center gap-1 rounded-sm py-0 text-white' onClick={()=>navigate('/Addresswise')}>
            <IoMdArrowBack className=' h-6 w-8'/>Back
            </button>
       <p > <span className=' font-bold text-lg'> पत्ता : </span>  <span className=' font-semibold text-lg'> {address} </span> </p>
        </p>
        <div>
        <p className=" flex gap-6">
                            <h6 className="font-bold text-orange-400 text-lg">महिला  :  {voterCount?.femaleCount}</h6>
                            <h6 className="font-bold text-green-500 text-lg">पुरुष  :  {voterCount?.maleCount}</h6>
                            <h6 className="font-bold text-blue-400 text-lg">माहित नाही  :  {other}</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण  :  {voterCount?.total}</h6>
                        </p>
        </div>
        </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-300 text-gray-600 text-sm leading-normal">
              {/* Table Headers */}
              <th className="px-1 py-2 border border-gray-300">भाग/बूथ नं</th>
              <th className="px-1 py-2 border border-gray-300">अ.नं.</th>
              <th className="px-1 py-2 border border-gray-300">नाव</th>
              <th className="px-1 py-2 border border-gray-300">वय </th>
              <th className="px-1 py-2 border border-gray-300">लिंग </th>
              <th className="px-1 py-2 border border-gray-300">मोबाईल नं</th>
              <th className="px-1 py-2 border border-gray-300">नवीन पत्ता</th>
              <th className="px-1 py-2 border border-gray-300">घर नं</th>
              <th className="px-1 py-2 border border-gray-300">पत्ता</th>
              <th className="px-1 py-2 border border-gray-300">कार्ड नं</th>
              <th className="px-1 py-2 border border-gray-300">मुळगाव</th>
              <th className="px-1 py-2 border border-gray-300">क्रिया</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentRows.map((row, index) => (
              <tr
                key={index}
                className={`odd:bg-gray-100 even:bg-white`}
                // className="border-b border-gray-200 hover:bg-gray-100"
                onClick={() => handleRowClick(row)}
              >
                {/* Table Data */}
                <td className="px-1 py-2 border border-gray-300">{row.boothNo}</td>
                <td className="px-1 py-2 border border-gray-300">{row.serialNo}</td>
                <td className="px-1 py-2 border border-gray-300">{row.name}</td>
                <td className="px-1 py-2 border border-gray-300">{row.age}</td>
                <td className="px-1 py-2 border border-gray-300">{row.gender}</td>
                <td className="px-1 py-2 border border-gray-300">{row.mobile}</td>
                <td className="px-1 py-2 border border-gray-300">{row.NEW_ADDRESS}</td>
                <td className="px-1 py-2 border border-gray-300">{row.houseNo}</td>
                <td className="px-1 py-2 border border-gray-300">{row.address}</td>
                <td className="px-1 py-2 border border-gray-300">{row.cardNumber}</td>
                <td className="px-1 py-2 border border-gray-300">{row.nativePlace}</td>
                <td className="px-1 py-2 border border-gray-300 flex justify-center items-center">
                <Tooltip content="View" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button" onClick={()=>{setSelectedRow(row)
              setActiveViewModal(true)
            }}>
              <Icon icon="heroicons:eye" />
            </button>
          </Tooltip>

                </td>
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


        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          className={`bg-gray-200 text-gray-600 px-2 py-1 rounded-md ${currentPage === totalPages && 'opacity-50 cursor-not-allowed'}`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <Modal
         title="View Voter Details"
         activeModal={activeViewModal}
         className="max-w-2xl"
         themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
         onClose={() => setActiveViewModal(false)}
        >
 
 <h6 className=' bg-blue-200 py-1 px-2 rounded-sm'>
  <span className='w-48 font-sans font-semibold inline-block'> नाव </span>: {selectedRow?.name}
</h6>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> वय </span> <span>: {selectedRow?.age}</span>
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> आडनाव </span>: {selectedRow?.lastName}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> पत्ता </span>: {selectedRow?.address}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'>घर क्र</span>: {selectedRow?.houseNo}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> लिंग </span>: {selectedRow?.gender}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> अ क्र </span>: {selectedRow?.serialNo}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'>	कार्ड नं </span>: {selectedRow?.cardNumber}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> बूथ नं </span>: {selectedRow?.boothNo}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> मतदान केंद्र </span>: {selectedRow?.pollingStation}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> जिवंत / मृत </span>: {selectedRow?.aliveOrDead}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> जात </span>: {selectedRow?.caste}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> नगर </span>: {selectedRow?.city}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> जन्मतारीख </span>: {selectedRow?.dateOfBirth}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> जवळचे ठिकाण </span>: {selectedRow?.landMark}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> मोबाईल नं </span>: {selectedRow?.mobile}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> घर प्रमुख </span>: {selectedRow?.nameOfHeadOfFamily?"हो":"नाही"}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> मुळगाव </span>: {selectedRow?.nativePlace}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> संदर्भ </span>: {selectedRow?.referenceFrom}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> आपले </span>: {selectedRow?.apleNaraj?"हो":"नाही"}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> विरोधी </span>: {selectedRow?.tyncheNaraj?"हो":"नाही"}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> बांधावर </span>: {selectedRow?.mahilaBachatGath?"हो":"नाही"}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> बाहेरचे मतदार </span>: {selectedRow?.outSideVoter?"हो":"नाही"}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> ग्रामपंचायत पदाधिकारी </span>: {selectedRow?.panchayatPad?"हो":"नाही"}
</p>
<p> 
  <span className='w-48 font-sans font-semibold inline-block'> सोसायटी पदाधिकारी </span>: {selectedRow?.societyPad?"हो":"नाही"}
</p>


        </Modal>

    </div>
    </Card>
  );
};

export default AddressWiseTable2;
