
import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';
import Tooltip from "@/components/ui/Tooltip";
import Icon from "@/components/ui/Icon";
import Modal from '../../../components/ui/Modal';


const NameWiseCommonTable = ({ Props, onPageChange, voterCount,handelEditModal }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [inputPage, setInputPage] = useState();
  const [selectedRow,setSelectedRow]=useState()
  const [activeViewModal,setActiveViewModal]=useState(false)

  const data = Props?.length > 0 ? Props : [];  
  const totalPages = Math.ceil(voterCount?.total / 25);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  let currentRows = data;

  const ActiveDiactiveModal = (value) => {
    setActiveModal(value);
  };

console.log(selectedRow)
  useEffect(()=>{
    handelEditModal(activeModal)
  },[activeModal])

  useEffect(() => {
    if (onPageChange) {
      onPageChange(currentPage);
    }
  }, [currentPage, onPageChange, currentRows]);

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
    <div className="p-1">
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
                className={`odd:bg-gray-100 even:bg-white cursor-pointer`}
                // className="border-b border-gray-200 hover:bg-gray-100"
                onDoubleClick={() => handleRowClick(row)}
              >
                {/* Table Data */}
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
                <td className="px-1 py-2 border border-gray-300 flex justify-center items-center gap-1">
                  {/* {row.STATUS} */}
                  <Tooltip content="View" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button" onClick={()=>{setSelectedRow(row)
              setActiveViewModal(true)
            }}>
              <Icon icon="heroicons:eye" />
            </button>
          </Tooltip>
          {/* <Tooltip content="Edit" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button" onClick={()=>setActiveModal(true)}> 
              <Icon icon="heroicons:pencil-square" />
            </button>
          </Tooltip> */}
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
        <Modal
         title="View Voter Details"
         activeModal={activeViewModal}
         className="max-w-md"
         themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
         onClose={() => setActiveViewModal(false)}
        >
 
 <h6 className=' bg-blue-200 py-1 px-2 rounded-sm'>
  <span className='w-32 inline-block'> नाव </span>: {selectedRow?.name}
</h6>
<p> 
  <span className='w-32 inline-block'> वय </span> <span>: {selectedRow?.age}</span>
</p>
<p> 
  <span className='w-32 inline-block'> आडनाव </span>: {selectedRow?.lastName}
</p>
<p> 
  <span className='w-32 inline-block'> पत्ता </span>: {selectedRow?.address}
</p>
<p> 
  <span className='w-32 inline-block'>घर क्र</span>: {selectedRow?.houseNo}
</p>
<p> 
  <span className='w-32 inline-block'> लिंग </span>: {selectedRow?.gender}
</p>
<p> 
  <span className='w-32 inline-block'> अ क्र </span>: {selectedRow?.serialNo}
</p>
<p> 
  <span className='w-32 inline-block'>	कार्ड नं </span>: {selectedRow?.cardNumber}
</p>
<p> 
  <span className='w-32 inline-block'> बूथ नं </span>: {selectedRow?.boothNo}
</p>


        </Modal>
      </div>

<EditModal ActiveDiactiveModal={ActiveDiactiveModal} activeModal={activeModal} selectedRowData={selectedRowData}/>
    </div>
  );
};

export default NameWiseCommonTable;
