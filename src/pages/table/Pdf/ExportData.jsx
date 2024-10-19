// import React, { useEffect, useRef, useState } from "react";
// import Card from "../../../components/ui/Card";
// import Select from "@/components/ui/Select";
// import axios from "axios";
// import { base_url } from "../../../config/base_url";
// import ExportDataTable from "./ExportDataTable"; // Assuming this is a different component
// import PrintDataTable from "./PrintDataTable"; // Import the print component

// const ExportData = () => {
//     const id = localStorage.getItem('_id');
//     const [villageId, setVillageId] = useState("");
//     const [villageOption, setVillageOption] = useState([]);
//     const printRef = useRef();

 


//     useEffect(() => {
//         getVillageOption();
//     }, []);

//     const handleVillageChange = (e) => {
//         setVillageId(e.target.value);
//     };

//     const getVillageOption = () => {
//         axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
//             .then((resp) => {
//                 const villageOptions = resp.data.village?.map((item) => ({
//                     label: item?.name,
//                     value: item?._id
//                 }));
//                 setVillageOption(villageOptions);
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
//     };

//     const clearFields = () => {
//         setVillageId("");
//     };

//     const handlePrint = () => {
//         const printWindow = window.open('', '_blank');
//         printWindow.document.write(`
//             <html>
//                 <head>
//                     <title>Print Data</title>
//                     <style>
//                         /* Add any custom styles you want for printing here */
//                         body { font-family: Arial, sans-serif; }
//                         h2 { text-align: center; }
//                         /* Example: make the table full width */
//                         table { width: 100%; border-collapse: collapse; }
//                         th, td { border: 1px solid #000; padding: 8px; text-align: left; }
//                     </style>
//                 </head>
//                 <body>
//                     <h2>Export Data Table</h2>
//                     ${printRef.current.innerHTML} <!-- Include the content to print -->
//                 </body>
//             </html>
//         `);
//         printWindow.document.close();
//         printWindow.print();
//     };

//     return (
//         <div>
//             <div className="mb-4">
//                 <Card>
//                     <div className="mb-2 flex justify-between">
//                         <h6 className="font-bold text-[#b91c1c]">रेड / ग्रीन मतदार</h6>
//                         <div className="flex gap-6">
//                             <h6 className="font-bold text-orange-400 text-lg">महिला:</h6>
//                             <h6 className="font-bold text-green-500 text-lg">पुरुष:</h6>
//                             <h6 className="font-bold text-blue-400 text-lg">माहित नाही:</h6>
//                             <h6 className="font-bold text-[#b91c1c] text-lg">एकूण:</h6>
//                         </div>
//                     </div>
//                     <hr className="mb-3" />
//                     <div className="grid grid-cols-4 gap-2">
//                         <Select
//                             label="गाव"
//                             className="w-full"
//                             placeholder="गाव"
//                             value={villageId}
//                             options={villageOption}
//                             onChange={handleVillageChange}
//                         />
//                         <div className="flex justify-end gap-4 items-center mt-6">
//                             <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
//                                 क्लियर करा
//                             </button>
//                             <button className="bg-[#1B59F8] text-white py-2 px-10 my-7 rounded-md" onClick={handlePrint}>
//                                 Print
//                             </button>
//                         </div>
//                     </div>
//                 </Card>
//             </div>

//             <Card ref={printRef}>
//                 <ExportDataTable />
//             </Card>
//         </div>
//     );
// };

// export default ExportData;


import React, { useEffect, useRef, useState } from "react";
import Select from "../../../components/ui/Select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import ExportDataTable from "./ExportDataTable"; // Assuming this is a different component
import Card from "../../../components/ui/Card";

const ExportData = () => {
    const id = localStorage.getItem('_id');
    const [villageId, setVillageId] = useState("");
    const [villageOption, setVillageOption] = useState([]);
    const [boothNo,setBoothNo]=useState('')
    const [boothOption,setBoothOption]=useState([])
  

    const handleVillageChange = (e) => {
        setVillageId(e.target.value);
    };

    const getVillageOption = () => {
        axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`)
            .then((resp) => {
                const villageOptions = resp.data.village?.map((item) => ({
                    label: item?.name,
                    value: item?._id
                }));
                setVillageOption(villageOptions);
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

    const clearFields = () => {
        setVillageId("");
        setBoothNo("");
    };


useEffect(()=>{
    getVillageOption();
},[])

    useEffect(() => {
      
        getBoothNo()
    }, [villageId]);

    return (
        <div>
            <div className="mb-4">
                <Card>
                    <div className="mb-2 flex justify-between">
                        <h6 className="font-bold text-[#b91c1c]">Print PDF</h6>
                        <div className="flex gap-6">
                            <h6 className="font-bold text-orange-400 text-lg">महिला:</h6>
                            <h6 className="font-bold text-green-500 text-lg">पुरुष:</h6>
                            <h6 className="font-bold text-blue-400 text-lg">माहित नाही:</h6>
                            <h6 className="font-bold text-[#b91c1c] text-lg">एकूण:</h6>
                        </div>
                    </div>
                    <hr className="mb-3" />
                    <div className="grid grid-cols-4 gap-2">
                        <Select
                            label="गाव"
                            className="w-full"
                            placeholder="गाव"
                            value={villageId}
                            options={villageOption}
                            onChange={handleVillageChange}
                        />
                          <Select
              label="भाग/बूथ नं"
              className="w-full"
              placeholder="भाग/बूथ नं"
              options={boothOption}
              onChange={(e) =>setBoothNo(e.target.value)}
              value={boothNo}
            />
                        <div className="flex justify-end gap-4 items-center mt-1">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={clearFields}>
                                क्लियर करा
                            </button>
                            <button className="bg-[#1B59F8] text-white py-2 px-10 my-7 rounded-md" onClick={()=>window.print()}>
                                Print
                            </button>
                        </div>
                    </div>
                </Card>
            </div>


            <Card >
                <ExportDataTable />
            </Card>
        </div>
    );
};

export default ExportData;
