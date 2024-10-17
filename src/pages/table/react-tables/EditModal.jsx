import React, { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import Flatpickr from "react-flatpickr";
import { base_url } from "../../../config/base_url";
import axios from "axios";
import AddNewVoter from "./AddNewVoter";
import { toast } from "react-toastify";
import AddFamilyMember from "./AddFamilyMember";

const EditModal = ({ ActiveDiactiveModal, activeModal, selectedRowData }) => {
   const FamilyMember = selectedRowData?.namesOfMembers || [];
   const [selectedFamily,setSelectedFamily]=useState([])
  // const FamilyMember = [...(selectedRowData?.namesOfMembers || []), ...selectedFamily];

  const token = localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [addFamilyModal,setAddFamilyModal]=useState(false)
  const [businessOption,setBusinessOption]=useState([])
  const [casteOption,setCasteOption]=useState([])
  const [karyakartaOption,setKaryakartaOption]=useState([])

 
console.log(selectedFamily,"dtyutyyuttyuftyf")
  const [formData, setFormData] = useState({
    houseNo: "",
    landmark: "",
    city: "",
    mobileNo: "",
    aadhaarNo: "",
    caste: "",
    houseType: "",
    worker: "",
    society: "",
    village: "",
    marriageAnniversary: "",
    status: "",
    nativeVillage: "",
    occupation: "",
    color: "",
    dateOfBirth: "",
    sandharbha: "",
  });

  const handleClear = () => {
    setFormData({
      houseNo: "",
      landmark: "",
      city: "",
      mobileNo: "",
      aadhaarNo: "",
      caste: "",
      houseType: "",
      worker: "",
      society: "",
      village: "",
      marriageAnniversary: "",
      status: "",
      nativeVillage: "",
      occupation: "",
      color: "",
      dateOfBirth: "",
      sandharbha: "",
    });
    setModal(false); 
  };

  
  const handelSelectedFamily=(val)=>{
    setSelectedFamily(val)
  }

  const handleActiveModal = (value) => {
    setModal(value);
  };

const handleFamilyModal = (val) => {
  setAddFamilyModal(val)
}

  const [villageOptions, setVillageOptions] = useState([]);


  const homeTypeOptions = [
    { label: "स्वतःचे घर", value: "स्वतःचे घर" },
    { label: "भाडेकरू", value: "भाडेकरू" },
    { label: "स्थानांतरित", value: "स्थानांतरित" },
    { label: "घर बंद", value: "घर बंद" },
  ];

  const aliveOptions = [
    { label: "जिवंत", value: "जिवंत" },
    { label: "मृत", value: "मृत" },
  ];

  const getVillageOptions = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/surve/getAllVoterVillages`
      );
      const options = response.data.village.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setVillageOptions(options);
    } catch (error) {
      console.error("Error fetching village options:", error);
    }
  };

  const getBusinessOption= ()=>{
    axios.get(`${base_url}/get-BusinessMeta`)
    .then((resp)=>{
      const businessoption = resp.data.data.map((item) => ({
        label: item.business,
        value: item._id,
      }));
      setBusinessOption(businessoption);
     
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const getCasteOption=()=>{
    axios.get(`${base_url}/getCastMeta`)
    .then((resp)=>{
      const casteOption = resp.data.data.map((item) => ({
        label: item.castname,
        value: item._id,
      }));
      setCasteOption(casteOption);
     
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  const getKaryakartaOption=()=>{
    axios.get(`${base_url}/api/get-All-karykarte`)
    .then((resp)=>{
      const casteOption = resp.data.users.map((item) => ({
        label: item.fullName,
        value: item._id,
      }));
      setKaryakartaOption(casteOption);
   
    })
    .catch((error)=>{
      console.log(error)
    })
  }

  useEffect(() => {
    getVillageOptions();
    getBusinessOption()
    getCasteOption()
    getKaryakartaOption()
  }, []);
  

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleDateChange = (id, date) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: date[0],
    }));
  };

  const UpdateVoter = () => {
    const payload = {
      dateOfBirth: formData.dateOfBirth,
      mobile: formData.mobileNo,
      aadharCard: formData.aadhaarNo,
      caste: formData.caste,
      weddingAnniversary: formData.marriageAnniversary,
      aliveOrDead: formData.status,
      nativePlace: formData.nativeVillage,
      business: formData.occupation,
      colour: formData.color,
      houseNo: formData.houseNo,
      landMark: formData.landmark,
      city: formData.city,
      homeType: formData.houseType,
      karyakarta: formData.worker,
      society: formData.society,
      village: formData.village,
      referenceFrom: formData.sandharbha,
      namesOfMembers:selectedFamily
    };
    axios
      .post(
        `${base_url}/api/surve/update-voter/${selectedRowData?._id}`,
        payload,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((resp) => {
        ActiveDiactiveModal(false)
        toast.success('Update Sucessfully')
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Modal
        title="Edit Record"
        activeModal={activeModal}
        className="max-w-5xl"
        themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
        onClose={() => ActiveDiactiveModal(false)}
      >
        <div>
          <div className="mb-2 bg-blue-200 px-3 py-2 rounded-md">
            <p className="text-3xl">{selectedRowData?.name}</p>
            <p>{selectedRowData?.address}</p>
          </div>

          <div className="grid grid-cols-3 gap-10">
            {/* First Column */}
            <div className="col-span-1 space-y-4">
              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  घर क्र.
                </label>
                <InputGroup
                  type="text"
                  // label="घर क्र."
                  id="houseNo"
                  placeholder="घर क्र"
                  value={formData.houseNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" flex w-full">
                <label htmlFor="" className=" w-28">
                  लँडमार्क
                </label>
                <Select
                  // label="लँडमार्क"
                  className=" w-full"
                  placeholder="लँडमार्क"
                  value={formData.landmark}
                  onChange={(value) => handleSelectChange("landmark", value)}
                  options={[
                    { label: "Option 1", value: "option1" },
                    { label: "Option 2", value: "option2" },
                    // Add more options as needed
                  ]}
                />
              </div>

              <div className=" flex ">
                <label htmlFor="" className=" w-28">
                  नगर
                </label>

                <Select
                  // label="नगर"
                  className="w-full"
                  placeholder="नगर"
                  value={formData.city}
                  onChange={(value) => handleSelectChange("city", value)}
                  options={[
                    { label: "City 1", value: "city1" },
                    { label: "City 2", value: "city2" },
                    // Add more options as needed
                  ]}
                />
              </div>
              <div className=" flex">
                <label className="block text-sm font-medium  w-28 text-gray-700">
                  जन्मतारीख
                </label>
                <Flatpickr
                  className="form-control  py-2 mt-0 w-full"
                  value={formData.dateOfBirth}
                  onChange={(date) => handleDateChange("dateOfBirth", date)}
                  options={{ dateFormat: "d/m/Y" }}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  मोबाईल नं
                </label>

                <InputGroup
                  type="text"
                  // label="मोबाईल नं"
                  id="mobileNo"
                  placeholder="मोबाईल नं"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  आधार नं
                </label>

                <InputGroup
                  type="text"
                  // label="आधार कार्ड नं"
                  id="aadhaarNo"
                  placeholder="आधार कार्ड नं"
                  value={formData.aadhaarNo}
                  onChange={handleInputChange}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  जात
                </label>

                <Select
                  // label="जात"
                  className="w-full"
                  placeholder="जात"
                  options={casteOption}
                  value={formData.caste}
                  onChange={(value) => handleSelectChange("caste", value)}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  घराचा प्रकार
                </label>

                <Select
                  // label="घराचा प्रकार"
                  className="w-full"
                  placeholder="घराचा प्रकार"
                  options={homeTypeOptions}
                  value={formData.houseType}
                  onChange={(value) => handleSelectChange("houseType", value)}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  कार्यकर्ता
                </label>

                <Select
                  // label="कार्यकर्ता"
                  className="w-full"
                  placeholder="कार्यकर्ता"
                  options={karyakartaOption}
                  value={formData.worker}
                  onChange={(value) => handleSelectChange("worker", value)}
                />
              </div>
              <div
                className="bg-blue-500 flex justify-center items-center rounded-md py-1 mt-4"
                onClick={UpdateVoter}
              >
                <button className="text-white">Save</button>
              </div>
            </div>

            {/* Second Column */}
            <div className="col-span-1 space-y-4">
              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  सोसायटी
                </label>

                <Select
                  // label="सोसायटी"
                  className="w-full"
                  placeholder="सोसायटी"
                  value={formData.society}
                  onChange={(value) => handleSelectChange("society", value)}
                  options={[
                    { label: "Society 1", value: "society1" },
                    { label: "Society 2", value: "society2" },
                    // Add more options as needed
                  ]}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  गाव
                </label>

                <Select
                  // label="गाव"
                  className="w-full"
                  placeholder="गाव"
                  value={formData.village}
                  options={villageOptions}
                  onChange={(value) => handleSelectChange("village", value)}
                />
              </div>
              <div className="pt-1 pb-1">Detail Address</div>

              <div className=" flex ">
                <label className="block text-sm font-medium w-28 text-gray-700">
                  लग्नाचा वाढदिवस
                </label>
                <Flatpickr
                  className="form-control py-2 mt-0 w-full"
                  value={formData.marriageAnniversary}
                  onChange={(date) =>
                    handleDateChange("marriageAnniversary", date)
                  }
                  options={{ dateFormat: "d/m/Y" }}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  जिवंत/ मृत
                </label>

                <Select
                  // label="जिवंत/ मृत"
                  className="w-full"
                  placeholder="जिवंत/ मृत"
                  options={aliveOptions}
                  value={formData.status}
                  onChange={(value) => handleSelectChange("status", value)}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-20">
                  मुळगाव
                </label>

                <InputGroup
                  type="text"
                  // label="मुळगाव"
                  id="mulgav"
                  placeholder="मुळगाव"
                  value={formData.nativeVillage}
                  onChange={handleInputChange}
                />
              </div>
              {/* <Select
                label="मुळगाव"
                className="w-full"
                placeholder="मुळगाव"
                value={formData.nativeVillage}
                onChange={(value) => handleSelectChange('nativeVillage', value)}
                options={[
                  { label: "Native Village 1", value: "nativeVillage1" },
                  { label: "Native Village 2", value: "nativeVillage2" },
                  // Add more options as needed
                ]}
              /> */}

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                व्यवसाय
                </label>

                <Select
                  // label="व्यवसाय"
                  className="w-full"
                  placeholder="व्यवसाय"
                  value={formData.occupation}
                  onChange={(value) => handleSelectChange("occupation", value)}
                  options={businessOption}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  रंग
                </label>

                <Select
                  // label="रंग"
                  className="w-full"
                  placeholder="रंग"
                  value={formData.color}
                  onChange={(value) => handleSelectChange("color", value)}
                  options={[
                    { label: "लाल", value: "red" },
                    { label: "हिरवा", value: "green" },
                  ]}
                />
              </div>

              <div className=" flex">
                <label htmlFor="" className=" w-28">
                  संदर्भ
                </label>

                <Select
                  // label="संदर्भ"
                  className="w-full"
                  placeholder="संदर्भ"
                  value={formData.sandharbha}
                  onChange={(value) => handleSelectChange("sandharbha", value)}
                  options={[
                    { label: "Reference 1", value: "reference1" },
                    { label: "Reference 2", value: "reference2" },
                    // Add more options as needed
                  ]}
                />
              </div>
              <div className="bg-blue-500 flex justify-center items-center rounded-md py-1 mt-4">
                <button className="text-white" onClick={handleClear}>Cancel</button>
              </div>
            </div>

            {/* Third Column */}
            <div className="col-span-1 space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <button
                  className="bg-blue-500 text-white rounded-md py-1"
                  onClick={() => setModal(true)}
                >
                  New
                </button>
                <button className="bg-blue-500 text-white rounded-md py-1" onClick={()=>setAddFamilyModal(true)}>
                  Select Family
                </button>
              </div>
              <div className="mt-5 border h-[29rem] overflow-y-auto overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        नाव
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        मोबाईल नं.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        जन्मतारीख
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        आधार
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        अ क्र.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        वय
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        लिंग
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {FamilyMember.map((member, index) => (
                      <tr key={index}>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {member}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {member.MOBILE_NO}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {member.dateOfBirth}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {member.aadhar}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {member.serialNo}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {member.age}
                        </td>
                        <td className="px-6 py-2 whitespace-nowrap">
                          {member.gender}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <AddNewVoter handleActiveModal={handleActiveModal} modal={modal} />
      <AddFamilyMember handleFamilyModal={handleFamilyModal} addFamilyModal={addFamilyModal} handelSelectedFamily={handelSelectedFamily}/>
    </div>
  );
};

export default EditModal;
