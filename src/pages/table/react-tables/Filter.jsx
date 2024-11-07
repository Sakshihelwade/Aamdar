import React, { useEffect, useState } from "react";
import Card from "../../../components/ui/Card";
import Select from "react-select";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import FilterTable from "../react-tables/FilterTable";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";


const Filter = () => {
    const [villageId, setVillageId] = useState("");
    const [villageName, setVillageName] = useState("");
    const [gathName, setGathName] = useState('')
    const [boothNo, setBoothNo] = useState("");
    const [srNo, setSrNo] = useState("");
    const [voterName, setVoterName] = useState("");
    const [cardNo, setCardNo] = useState("");
    const [relative, setRelative] = useState("");
    const [relativeName, setRelativeName] = useState("");
    const [ganName,setGanName]=useState('')
    const [ganId,setGanId]=useState('')
    const [gathId,setGathId]=useState('')
    const [allVoter, setAllVoter] = useState([])
    const [voterCount, setVoterCount] = useState()
    const [gathOption, setGathOption] = useState([])
    const [ganOption,setGanOption]=useState([])
    const [villageOption, setVillageOption] = useState([]); const [boothOption, setBoothOption] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [editModal, setEditModal] = useState();
    const id = localStorage.getItem('_id')
    const totalmalefemale = voterCount?.maleCount + voterCount?.femaleCount
    const other = voterCount?.total - totalmalefemale || 0

    const [selectedFilter, setSelectedFilter] = useState(null);

    // Your FilterOptions array with dynamic keys
    const FilterOptions = [
        {value: "outSideVoter",label: "बाहेरचे मतदार"},
        { value: "apleNaraj", label: "आपले " },
        { value: "tyncheNaraj", label: "विरोधी" },
        { value: "voterWithBankAc", label: "वोटर बँक खाते" },
        { value: "panchayatPad", label: "पंचायत पद" },
        { value: "societyPad", label: "सोसायटी पद" },
        { value: "mahilaBachatGath", label: "बांधावर" },
    ];

    console.log("selectedFilter", selectedFilter)


    const handelEditModal = (val) => {
        setEditModal(val)
    }

    const handleClear = () => {
        setVillageId("");
        setVillageName("");
        setGanId('')
        setGanName('')
        setGathName('')
        setGathId('')
        setBoothNo("");
        setSrNo("");
        setVoterName("");
        setCardNo("");
        setRelative("");
        setRelativeName("");
        setCurrentPage(1);
        setSelectedFilter(null); // Reset selected filter
        setAllVoter([]);
        setVoterCount({});
        getAllVoters()
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleVillageChange = (selectedOption) => {
        setVillageId(selectedOption?.value || "");
        setVillageName(selectedOption?.label || "");
        setBoothNo('')
    };

    const generateExcel = (data) => {
        const rows = data.map((item) => ({
          ['भाग/बूथ नं']: item.boothNo, 
          ['अ.क्र.']: item.serialNo, 
          ['नाव']: item.name, 
          ['वय']: item.age  , 
          ['लिंग']: item.gender, 
          ['घर नं']: item.houseNo, 
          ['पत्ता']: item.address , 
          ['कार्ड नं']: item.cardNumber,
         
        }));
    
        // Create a new workbook
        const wb = XLSX.utils.book_new();
    
        // Convert the data into a worksheet
        const ws = XLSX.utils.json_to_sheet(rows);
    
        // Append the worksheet to the workbook
        XLSX.utils.book_append_sheet(wb, ws, "Namewise Data");
    
        // Create a downloadable Excel file
        XLSX.writeFile(wb, "मतदार.xlsx");
      };
    
      const handleExcel = () => {
        const filterQueryParam = selectedFilter ? `${selectedFilter.value}=true` : "";
        const url = `${base_url}/api/surve/searchVotter/${id}?name=true&printOut=true&boothNo=${boothNo}&serialNo=${srNo}&nameFilter=${voterName}&village=${villageName}&cardNumber=${cardNo}&${filterQueryParam}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`;
        axios
          .get(url)
          .then((resp) => {
            var voters = resp.data.voters;
           
            generateExcel(voters);
          })
          .catch((error) => {
            toast.warning('You can only print 5000 records at a time')
            console.error(error);
          });
      };

      const getGath= () => {
        axios.get(`${base_url}/api/surve/getAllVoterGath/${id}`)
           .then((resp)=>{
            const gathName=resp.data.gaths.map((item)=>({
                label:item.name , value:item._id
            }))
            setGathOption(gathName)
    
          })
          .catch((error) => {
            console.log(error)
          })
      }
    
      const getGan= () => {
        axios.get(`${base_url}/api/surve/getAllVoterGan/${id}?gathaId=${gathId}`)
           .then((resp)=>{
            const gan=resp.data.Gans.map((item)=>({
                label:item.name , value:item._id
            }))
            setGanOption(gan)
    
          })
          .catch((error) => {
            console.log(error)
          })
      }


    const getVillageOption = () => {
        axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}?gathId=${gathId}&ganId=${ganId}`)
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


    const getBoothNo = () => {
        axios.get(`${base_url}/api/surve/getSortBooth/${id}?villageId=${villageId}`)
            .then((resp) => {
                const boothNo = resp.data.booths.map((item) => ({
                    label: item.boothNo, value: item.boothNo
                }))
                setBoothOption(boothNo)

            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleGathChange=(selectedOption) => {
        setGathName(selectedOption?.label || "")
        setGathId(selectedOption?.value || "")
        setGanId('')
        setGanName('')
        setVillageName('')
        setVillageId('')
        setBoothNo('')
      }
    
      const handleGanChange=(selectedOption) => {
        setGanName(selectedOption?.label || "")
        setGanId(selectedOption?.value || "")
        setVillageId('')
    setVillageName('')
    setBoothNo('')
      }

    const getAllVoters = () => {
        const filterQueryParam = selectedFilter ? `${selectedFilter.value}=true` : "";
        console.log("filterQueryParam", filterQueryParam);
        axios
            .get(
                `${base_url}/api/surve/searchVotter/${id}?name=true&boothNo=${boothNo}&serialNo=${srNo}&nameFilter=${voterName}&village=${villageName}&cardNumber=${cardNo}&page=${currentPage}&${filterQueryParam}&gath=${gathName}&gathaId=${gathId}&gan=${ganName}&ganId=${ganId}`
            )
            .then((resp) => {
                setAllVoter(resp.data.voters);
                setVoterCount(resp.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        getVillageOption();
        getGath()
    }, []);

    useEffect(() => {
        getGan()
    }, [gathName])


    useEffect(() => {
        getBoothNo()
    }, [villageId])


    useEffect(() => {
        getAllVoters();
    }, [currentPage, villageName, boothNo, srNo, voterName, cardNo, editModal, selectedFilter,gathName,ganName]);

    return (
        <div>
            <div className="mb-4">
                <Card>
                    <div className="mb-2 flex justify-between">
                        <h6 className="font-bold text-[#b91c1c]">इतर फिल्टर</h6>

                    </div>
                    <hr className="py-2" />
                    <p className=" text-[#b91c1c]">
                        <span className="font-bold">विधानसभा</span> :
                        <span className="font-bold text-lg">8</span>
                    </p>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    <div>
        <label className="form-label" htmlFor="mul_1">
        गट
        </label>
  <Select
  // isClearable={true}
  placeholder="गट"
  name="गट" 
  value={gathOption.find(option => option.value === gathId) || null} 
  options={gathOption}
  onChange={handleGathChange} 
  className="react-select"
  classNamePrefix="select"
/>
</div>
          <div>
        <label className="form-label" htmlFor="mul_1">
        गण
        </label>
  <Select
  // isClearable={true}
  placeholder="गण"
  name="गण" 
  value={ganOption.find(option => option.value === ganId) || null} 
  options={ganOption}
  onChange={handleGanChange} 
  className="react-select"
  classNamePrefix="select"
/>
</div>

                        <div>
                            <label className="form-label" htmlFor="mul_1">
                                गाव
                            </label>
                            <Select
                                // isClearable={true}
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
                            <label className="form-label" htmlFor="mul_1">
                                भाग/बूथ नं
                            </label>
                            <Select
                                // isClearable={true}
                                placeholder="भाग/बूथ नं"
                                name="भाग/बूथ नं"
                                value={boothOption.find(option => option.value === boothNo) || null}
                                options={boothOption}
                                onChange={(selectedOption) => setBoothNo(selectedOption?.value || null)}
                                className="react-select"
                                classNamePrefix="select"
                            />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="mul_1">
                                इतर फिल्टर
                            </label>
                            <Select
                                placeholder="इतर फिल्टर"
                                name="filter"
                                value={FilterOptions.find((option) => option.value === selectedFilter?.value) || null}
                                options={FilterOptions}
                                onChange={(option) => setSelectedFilter(option)}
                                className="react-select"
                                classNamePrefix="select"
                                // isClearable={true}
                            />
                        </div>

                        <div className="flex justify-end items-center gap-2 mt-6">
                            <button className="bg-[#b91c1c] text-white px-5 h-10 rounded-md" onClick={handleClear}>
                                Clear
                            </button>
                            <button onClick={handleExcel} className="bg-[#b91c1c] text-white px-5 h-10 rounded-md"> Excel</button>

                        </div>
                    </div>
                </Card>
            </div>
            <Card>
                <FilterTable Props={allVoter} voterCount={voterCount} currentPage={currentPage}
                    setCurrentPage={setCurrentPage} onPageChange={handlePageChange} handelEditModal={handelEditModal} />
            </Card>

        </div>
    );
};

export default Filter;