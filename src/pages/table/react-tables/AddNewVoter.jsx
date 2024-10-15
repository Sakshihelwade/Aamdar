import React, { useEffect, useState } from 'react';
import Modal from '../../../components/ui/Modal';
import axios from 'axios';
import { base_url } from '../../../config/base_url';
import { toast } from 'react-toastify';

const AddNewVoter = () => {
    const token = localStorage.getItem('token');
    const [activeModal, setActiveModal] = useState(true);
    const [villageOptions, setVillageOption] = useState([])
    // State management for input fields
    useEffect(() => {
        getAllVillages()
    }, [])
    const getAllVillages = async () => {
        try {
            const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages`)
            // console.log(response.data, "iiiiii")
            setVillageOption(response.data.village)
        } catch (error) {
            console.log(error)
        }
    }
    const [voterDetails, setVoterDetails] = useState({
        name: '',
        address: '',
        mobileNo: '',
        society: '',
        landmark: '',
        village: '',
        city: ''
    });


    const societyOptions = ['Society A', 'Society B', 'Society C'];
    const landmarkOptions = ['Landmark X', 'Landmark Y', 'Landmark Z'];
    // const villageOptions = ['Village 1', 'Village 2', 'Village 3'];
    const cityOptions = ['City A', 'City B', 'City C'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVoterDetails({
            ...voterDetails,
            [name]: value
        });
    };

    const handleCloseModal = () => {
        setActiveModal(false);
    };


    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: voterDetails.name,
                address: voterDetails.address,
                mobile: voterDetails.mobileNo,
                society: voterDetails.society,
                landmark: voterDetails.landmark,
                village: voterDetails.village,
                city: voterDetails.city,
            }
            console.log(payload,"payloaddd")
            const response = await axios.post(`${base_url}/api/surve/add-newVotter`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if(response.status===201 ){
                toast.success("Voter Created Successfully!")
                setActiveModal(false);
            }
            console.log(response.data)
        } catch (error) {
            console.log(error)
            toast.error("Failed to create voter!")
        }
    };

    return (
        <div>
            <Modal
                title="New Voter"
                activeModal={activeModal}
                themeClass="bg-blue-500 blue:bg-blue-500 blue:border-b blue:border-blue-700"
                onClose={handleCloseModal}
            >
                <form className="space-y-4" onSubmit={handleSave}>
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={voterDetails.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={voterDetails.address}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mobile No</label>
                        <input
                            type="text"
                            name="mobileNo"
                            value={voterDetails.mobileNo}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Society</label>
                        <select
                            name="society"
                            value={voterDetails.society}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Society</option>
                            {societyOptions.map((society, index) => (
                                <option key={index} value={society}>
                                    {society}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Landmark</label>
                        <select
                            name="landmark"
                            value={voterDetails.landmark}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Landmark</option>
                            {landmarkOptions.map((landmark, index) => (
                                <option key={index} value={landmark}>
                                    {landmark}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Village</label>
                        <select
                            name="village"
                            value={voterDetails.village}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select Village</option>
                            {villageOptions.map((village, index) => (
                                <option key={index} value={village._id}>
                                    {village.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">City</label>
                        <select
                            name="city"
                            value={voterDetails.city}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select City</option>
                            {cityOptions.map((city, index) => (
                                <option key={index} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCloseModal}
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
