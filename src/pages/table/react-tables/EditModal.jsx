import React, { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import InputGroup from "@/components/ui/InputGroup";
import Select from "@/components/ui/Select";
import Flatpickr from "react-flatpickr";
import { base_url } from '../../../config/base_url';
import axios from 'axios';

const EditModal = ({ ActiveDiactiveModal, activeModal, selectedRowData }) => {
  const FamilyMember = selectedRowData?.namesOfMembers || [];
  const token=localStorage.getItem('token')
  
  const [formData, setFormData] = useState({
    houseNo: '',
    landmark: '',
    city: '',
    mobileNo: '',
    aadhaarNo: '',
    caste: '',
    houseType: '',
    worker: '',
    society: '',
    village: '',
    marriageAnniversary: '',
    status: '',
    nativeVillage: '',
    occupation: '',
    color: '',
    dateOfBirth: '',
    sandharbha:''
  });

  const [villageOptions, setVillageOptions] = useState([]);

  
  const casteOptions = [
    { label: "हिंदू मराठा", value: "हिंदू मराठा" }
  ];

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
      const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages`);
      const options = response.data.village.map(item => ({
        label: item.name,
        value: item._id
      }));
      setVillageOptions(options);
    } catch (error) {
      console.error("Error fetching village options:", error);
    }
  };

  useEffect(() => {
    getVillageOptions();
  }, []);

  
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  
  const handleSelectChange = (id, value) => {
    setFormData(prevState => ({
      ...prevState,
      [id]: value,
    }));
  };

  
  const handleDateChange = (id, date) => {
    setFormData(prevState => ({
      ...prevState,
      [id]: date[0], 
    }));
  };



  const UpdateVoter=()=>{
    const payload={
        dateOfBirth:formData.dateOfBirth,
        mobile:formData.mobileNo,
        aadharCard:formData.aadhaarNo,
        caste:formData.caste,
        weddingAnniversary:formData.marriageAnniversary,
        aliveOrDead:formData.status,
        nativePlace:formData.nativeVillage,
        business:formData.occupation,
        colour:formData.color,

        houseNo:formData.houseNo,
        landMark:formData.landmark,
        city:formData.city,
        homeType:formData.houseType,
        karyakarta:formData.worker,
        society:formData.society,
        village:formData.village,
        referenceFrom:formData.sandharbha

    }
    axios.post(`${base_url}/api/surve/update-voter/${selectedRowData._id}`, payload,{
        headers:{
            Authorization:`${token}`
        }
    })
    .then((resp)=>{
        console.log(resp)
    })
    .catch((error)=>{
        console.log(error)
    })
  }


  return (
    <div>
      <Modal
        title="Edit Record"
        activeModal={activeModal}
        className='w-full'
        themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
        onClose={() => ActiveDiactiveModal(false)}
      >
        <div>
          <div className='mb-6'>
            <p className='text-3xl'>{selectedRowData?.name}</p>
            <p>{selectedRowData?.address}</p>
          </div>
          
          <div className='grid grid-cols-3 gap-10'>
            {/* First Column */}
            <div className='col-span-1 space-y-4'>
              <InputGroup
                type="text"
                label="घर क्र."
                id="houseNo"
                placeholder="घर क्र"
                value={formData.houseNo}
                onChange={handleInputChange}
              />
              <Select
                label="लँडमार्क"
                className="w-full"
                placeholder="लँडमार्क"
                value={formData.landmark}
                onChange={(value) => handleSelectChange('landmark', value)}
                options={[
                  { label: "Option 1", value: "option1" },
                  { label: "Option 2", value: "option2" },
                  // Add more options as needed
                ]}
              />
              <Select
                label="नगर"
                className="w-full"
                placeholder="नगर"
                value={formData.city}
                onChange={(value) => handleSelectChange('city', value)}
                options={[
                  { label: "City 1", value: "city1" },
                  { label: "City 2", value: "city2" },
                  // Add more options as needed
                ]}
              />
              <div>
                <label className='block text-sm font-medium text-gray-700'>जन्मतारीख</label>
                <Flatpickr
                  className="form-control py-2 mt-2 w-full"
                  value={formData.dateOfBirth}
                  onChange={(date) => handleDateChange('dateOfBirth', date)}
                  options={{ dateFormat: "d/m/Y" }}
                />
              </div>
              <InputGroup
                type="text"
                label="मोबाईल नं"
                id="mobileNo"
                placeholder="मोबाईल नं"
                value={formData.mobileNo}
                onChange={handleInputChange}
              />
              <InputGroup
                type="text"
                label="आधार कार्ड नं"
                id="aadhaarNo"
                placeholder="आधार कार्ड नं"
                value={formData.aadhaarNo}
                onChange={handleInputChange}
              />
              <Select
                label="जात"
                className="w-full"
                placeholder="जात"
                options={casteOptions}
                value={formData.caste}
                onChange={(value) => handleSelectChange('caste', value)}
              />
              <Select
                label="घराचा प्रकार"
                className="w-full"
                placeholder="घराचा प्रकार"
                options={homeTypeOptions}
                value={formData.houseType}
                onChange={(value) => handleSelectChange('houseType', value)}
              />
              <Select
                label="कार्यकर्ता"
                className="w-full"
                placeholder="कार्यकर्ता"
                value={formData.worker}
                onChange={(value) => handleSelectChange('worker', value)}
              />
              <div className='bg-blue-500 flex justify-center items-center rounded-md py-1 mt-4' onClick={UpdateVoter}>
                <button className="text-white">Save</button>
              </div>
            </div>

            {/* Second Column */}
            <div className='col-span-1 space-y-4'>
              <Select
                label="सोसायटी"
                className="w-full"
                placeholder="सोसायटी"
                value={formData.society}
                onChange={(value) => handleSelectChange('society', value)}
                options={[
                  { label: "Society 1", value: "society1" },
                  { label: "Society 2", value: "society2" },
                  // Add more options as needed
                ]}
              />
              <Select
                label="गाव"
                className="w-full"
                placeholder="गाव"
                value={formData.village}
                options={villageOptions}
                onChange={(value) => handleSelectChange('village', value)}
              />
              <div className='pt-9 pb-3'>Detail Address</div>
    
              <div>
                <label className='block text-sm font-medium text-gray-700'>लग्नाचा वाढदिवस</label>
                <Flatpickr
                  className="form-control py-2 mt-2 w-full"
                  value={formData.marriageAnniversary}
                  onChange={(date) => handleDateChange('marriageAnniversary', date)}
                  options={{ dateFormat: "d/m/Y" }}
                />
              </div>
              <Select
                label="जिवंत/ मृत"
                className="w-full"
                placeholder="जिवंत/ मृत"
                options={aliveOptions}
                value={formData.status}
                onChange={(value) => handleSelectChange('status', value)}
              />
               <InputGroup
                type="text"
                label="मुळगाव"
                id="mulgav"
                placeholder="मुळगाव"
                value={formData.nativeVillage}
                onChange={handleInputChange}
              />
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
              <Select
                label="व्यवसाय"
                className="w-full"
                placeholder="व्यवसाय"
                value={formData.occupation}
                onChange={(value) => handleSelectChange('occupation', value)}
                options={[
                  { label: "Occupation 1", value: "occupation1" },
                  { label: "Occupation 2", value: "occupation2" },
                  // Add more options as needed
                ]}
              />
              <Select
                label="रंग"
                className="w-full"
                placeholder="रंग"
                value={formData.color}
                onChange={(value) => handleSelectChange('color', value)}
                options={[
                  { label: "Red", value: "red" },
                  { label: "Green", value: "green" },  
                ]}
              />
              <Select
                label="संदर्भ"
                className="w-full"
                placeholder="संदर्भ"
                value={formData.sandharbha}
                onChange={(value) => handleSelectChange('sandharbha', value)}
                options={[
                  { label: "Reference 1", value: "reference1" },
                  { label: "Reference 2", value: "reference2" },
                  // Add more options as needed
                ]}
              />
              <div className='bg-blue-500 flex justify-center items-center rounded-md py-1 mt-4'>
                <button className="text-white">Cancel</button>
              </div>
            </div>

            {/* Third Column */}
            <div className='col-span-1 space-y-4'>
              <div className='grid grid-cols-2 gap-5'>
                <button className="bg-blue-500 text-white rounded-md py-1">New</button>
                <button className="bg-blue-500 text-white rounded-md py-1">Select Family</button>
              </div>
              <div className="mt-5 border h-[47rem] overflow-y-auto overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">नाव</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">मोबाईल नं.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">जन्मतारीख</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">आधार</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">अ क्र.</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">वय</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">लिंग</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {
                      FamilyMember.map((member, index) => (
                        <tr key={index}>
                          <td className="px-6 py-2 whitespace-nowrap">{member.name}</td>
                          <td className="px-6 py-2 whitespace-nowrap">{member.MOBILE_NO}</td>
                          <td className="px-6 py-2 whitespace-nowrap">{member.dateOfBirth}</td>
                          <td className="px-6 py-2 whitespace-nowrap">{member.aadhar}</td>
                          <td className="px-6 py-2 whitespace-nowrap">{member.serialNo}</td>
                          <td className="px-6 py-2 whitespace-nowrap">{member.age}</td>
                          <td className="px-6 py-2 whitespace-nowrap">{member.gender}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
