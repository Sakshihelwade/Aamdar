

import React, { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import axios from 'axios';
import { base_url } from '../../../config/base_url';
import { toast } from 'react-toastify';
import Select from "react-select";

const AddNewVoter = ({ handleActiveModal, modal }) => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('_id');

    const [villageOptions, setVillageOption] = useState([]);
    const [landmarkOptions, setLandmarkOptions] = useState([]);
    const [nagerOptions, setNagerOptions] = useState([]);
    const [societyOptions, setSocietyOptions] = useState([]);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [cardNo, setCardNo] = useState('');
    const [society, setSociety] = useState(null);
    const [landmark, setLandmark] = useState(null);
    const [village, setVillage] = useState(null);
    const [city, setCity] = useState(null);
    const [gender, setGender] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        getAllVillages();
        getLandmarkOptions();
        getNagerOptions();
        getSocietyOptions();
    }, []);

    const genderOption = [
        { label: "पुरुष", value: "पुरुष" },
        { label: "महिला", value: "महिला" },
        { label: "माहित नाही", value: "माहित नाही" },
    ];

    const getAllVillages = async () => {
        try {
            const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages/${id}`);
            setVillageOption(response.data?.village?.map(v => ({ label: v.name, value: v.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const getLandmarkOptions = async () => {
        try {
            const response = await axios.get(`${base_url}/get-landmark`);
            setLandmarkOptions(response.data.data.map(item => ({ label: item.name, value: item.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const getNagerOptions = async () => {
        try {
            const response = await axios.get(`${base_url}/get-nager`);
            setNagerOptions(response.data.data.map(item => ({ label: item.name, value: item.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const getSocietyOptions = async () => {
        try {
            const response = await axios.get(`${base_url}/get-society`);
            setSocietyOptions(response.data.data.map(item => ({ label: item.name, value: item.name })));
        } catch (error) {
            console.log(error);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'नाव आवश्यक आहे.';
        if (!address) newErrors.address = 'पत्ता आवश्यक आहे.';
        if (!mobileNo) newErrors.mobileNo = 'मोबाईल नं. आवश्यक आहे.';
        if (!cardNo) newErrors.cardNo = 'कार्ड नं आवश्यक आहे.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const payload = {
                name:name,
                address:address,
                mobile: mobileNo,
                society:society,
                landmark:landmark,
                village:village,
                city:city,
                gender:gender,
                cardNumber:cardNo,
                aliveOrDead:"Alive"
            };
            console.log(payload,"payyload")
            const response = await axios.post(`${base_url}/api/surve/add-newVotter`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                toast.success("Voter Created Successfully!");
                handleActiveModal(false);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create voter!");
        }
    };

    return (
        <div>
            <Modal
                title="New Voter"
                activeModal={modal}
                themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
                onClose={() => handleActiveModal(false)}
            >
                <form className="space-y-4" onSubmit={handleSave}>
                    <div>
                        <label className="block text-sm font-medium">नाव</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
                            required
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">पत्ता</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className={`w-full p-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded`}
                            required
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">मोबाईल नं.</label>
                        <input
                            type="text"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            className={`w-full p-2 border ${errors.mobileNo ? 'border-red-500' : 'border-gray-300'} rounded`}
                            required
                        />
                        {errors.mobileNo && <p className="text-red-500 text-sm">{errors.mobileNo}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">कार्ड नं</label>
                        <input
                            type="text"
                            value={cardNo}
                            onChange={(e) => setCardNo(e.target.value)}
                            className={`w-full p-2 border ${errors.cardNo ? 'border-red-500' : 'border-gray-300'} rounded`}
                            required
                        />
                        {errors.cardNo && <p className="text-red-500 text-sm">{errors.cardNo}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium">लिंग</label>
                        <Select
                            placeholder="लिंग"
                            value={genderOption.find(option => option.value === gender)}
                            onChange={selectedOption => setGender(selectedOption ? selectedOption.value : null)}
                            options={genderOption}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">सोसायटी</label>
                        <Select
                            placeholder="सोसायटी"
                            value={societyOptions.find(option => option.value === society)}
                            onChange={selectedOption => setSociety(selectedOption ? selectedOption.value : null)}
                            options={societyOptions}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">लँडमार्क</label>
                        <Select
                            placeholder="लँडमार्क"
                            value={landmarkOptions.find(option => option.value === landmark)}
                            onChange={selectedOption => setLandmark(selectedOption ? selectedOption.value : null)}
                            options={landmarkOptions}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">गाव</label>
                        <Select
                            placeholder="गाव"
                            value={villageOptions.find(option => option.value === village)}
                            onChange={selectedOption => setVillage(selectedOption ? selectedOption.value : null)}
                            options={villageOptions}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">नगर</label>
                        <Select
                            placeholder="नगर"
                            value={nagerOptions.find(option => option.value === city)}
                            onChange={selectedOption => setCity(selectedOption ? selectedOption.value : null)}
                            options={nagerOptions}
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => handleActiveModal(false)}
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-gray-600"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddNewVoter;
