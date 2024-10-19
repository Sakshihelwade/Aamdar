import { all } from 'axios';
import React, { useRef } from 'react';

const ExportDataTable = ({ props ,boothNo,villageName, total}) => {
  const printRef = useRef();
  // console.log(villageName,boothNo, "allData")
  return (
    <>
      <div className="p-1" id='print-content' ref={printRef}>
        <div className='text-center py-2 mb-3 font-semibold'>
          <p> गाव : {villageName} &nbsp;&nbsp;&nbsp; भाग/बूथ नं : {boothNo}  &nbsp;&nbsp;&nbsp; एकूण : {total}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-300 text-gray-600 text-sm leading-normal">
                {/* Table Headers */}
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
              {props?.map((item, index) => {
                return (
                  <>
                    <tr className={`odd:bg-gray-100 even:bg-white`}  key={index}>
                      {/* Table Data */}
                      <td className="px-1 py-2 border border-gray-300">{item?.boothNo}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.serialNo}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.name}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.age}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.gender}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.mobile}</td>
                      <td className="px-1 py-2 border border-gray-300"></td>
                      <td className="px-1 py-2 border border-gray-300">{item?.houseNo}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.address}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.cardNumber}</td>
                      <td className="px-1 py-2 border border-gray-300">{item?.nativePlace}</td>
                      <td className="px-1 py-2 border border-gray-300"></td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Print Styles */}
      <style>
        {`
          @media print {
              body * {
                  visibility: hidden;
              }
              #print-content, #print-content * {
                  visibility: visible;
              }
              #print-content {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100vw;
              }
          }
        `}
      </style>
    </>
  );
};

export default ExportDataTable;