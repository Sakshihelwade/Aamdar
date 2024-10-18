import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch } from "react-redux";
import Select from "@/components/ui/Select";
import { handleRegister } from "./store";
import axios from "axios";
import { base_url } from "../../../config/base_url";

// Validation schema
const schema = yup.object({
  voterId: yup.string().required("Voter ID is required"),
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password shouldn't be more than 20 characters")
    .required("Please enter a password"),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  // role: yup.string().required("Role selection is required"),
  userId: yup.string().required("User ID is required"),
}).required();

const RegForm = () => {
  const token = localStorage.getItem('token');
  // console.log(token, 'Auth Token');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // States for input fields
  const [voterId, setVoterId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");
  const [checked, setChecked] = useState(false);
  const [showVillageDropdown, setShowVillageDropdown] = useState(false);
  const [village, setVillage] = useState([]);
  const [villageOptions, setVillageOptions] = useState([])

  const toggleDropdown = () => setShowVillageDropdown(!showVillageDropdown);

  const handleVillageChange = (villages) => {
    if (village.some(v => v._id === village._id)) {
      setVillage(village.filter((v) => v._id !== village._id));
    } else {
      setVillage([...village, villages]);
    }
  };
  // console.log(villageId, villageName, ".........")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all", // Check if validation is running on every change
  });
  console.log(errors);


  const onSubmit = async () => {
    // const selectedVillageIds = villages.map(v => v._id).join(", ");
    const selectedVillageNames = village.map(v => v.name).join(", ");
    // const payload = {
    //   cardNumber: voterId,
    //   email: email,
    //   userName: userId,
    //   mobileNumber: mobile,
    //   password: password,
    //   role: role,
    //   fullName: name,
    //   villageName: selectedVillageNames,
    //   villageId: selectedVillageIds,
    // }
    const selectedVillageIds = village.map(v => v._id); // Array of village IDs
    // const selectedVillageNames = villages.map(v => v.name).join(", "); // Comma-separated village names

    const payload = {
      cardNumber: voterId,
      email: email,
      userName: userId,
      mobileNumber: mobile,
      password: password,
      role: role,
      fullName: name,
      villageName: selectedVillageNames,  // Comma-separated village names
      villages: selectedVillageIds        // Array of village IDs
    };


    // console.log(payload, "payyyyload")
    try {
      const response = await axios.post(`${base_url}/api/addUser`, payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        toast.success("User Registered successfully!");
        dispatch(handleRegister(response.data));
        navigate("/dashboard");
      }
      // console.log(response.data, "hiiiiiiiiiiiiiii");
    } catch (error) {
      console.log(error)
      toast.error("Failed to Register User");
    }
  }

  const options = [
    { label: "Admin", value: "Admin" },
    { label: "Surveyor", value: "Surveyor" },
    { label: "Karyakarta", value: "Karyakarta" },
  ];

  useEffect(() => {
    getAllVillages();
  }, [])

  const getAllVillages = async () => {
    try {
      const response = await axios.get(`${base_url}/api/surve/getAllVoterVillages`)
      setVillageOptions(response.data.village)
    } catch (error) {
      console.log(error);
    }
  }
  // useEffect(() => {
  //   if (villages.length > 0) {
  //     const selectedVillageIds = villages.map(v => v._id).join(", ");
  //     const selectedVillageNames = villages.map(v => v.name).join(", ");
  //     console.log("Selected Village IDs:", selectedVillageIds);
  //     console.log("Selected Village Names:", selectedVillageNames);
  //   } else {
  //     console.log("No villages selected.");
  //   }
  // }, [villages]);


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
        <Textinput
          name="voterId"
          label="Voter ID / ओळखपत्र क्र."
          type="text"
          placeholder="Enter your Voter ID"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          error={errors.voterId?.message}
          register={register}
        />
        <Textinput
          name="name"
          label="Name / नाव"
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name?.message}
          register={register}
        />
        <Textinput
          name="mobile"
          label="Mobile / मोबाइल"
          type="number"
          placeholder="Enter your mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          error={errors.mobile?.message}
          register={register}
        />
        <Textinput
          name="email"
          label="Email / ईमेल"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email?.message}
          register={register}
        />
        <Select
          label="Role / पद"
          className="w-full"
          placeholder="Select Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={options}
          error={errors.role?.message}
        />

        <Textinput
          name="userId"
          label="User ID / वापरकर्ता"
          type="text"
          placeholder="Enter your User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          error={errors.userId?.message}
          register={register}
        />
        <Textinput
          name="password"
          label="Password / संकेतशब्द"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password?.message}
          register={register}
        />
        <Textinput
          name="confirmpassword"
          label="Confirm Password / पुष्टी करा"
          type="password"
          placeholder="Confirm your password"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmpassword?.message}
          register={register}
        />
      </div>
      <div>
        <label className="block text-gray-700">Select Villages / गाव </label>
        <div className="relative">
          <div
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFB033] cursor-pointer"
            onClick={toggleDropdown}
          >
            Select villages
          </div>

          {showVillageDropdown && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {villageOptions.map((villageOption, index) => (
                <div key={index} className="p-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={village.some(v => v._id === villageOption._id)}  // Use villageOption here
                      onChange={() => handleVillageChange(villageOption)}       // Use villageOption here
                      className="mr-2"
                    />
                    {villageOption.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Selected: {village.map(v => v.name).join(", ") || "None"}
        </p>
      </div>
      <Checkbox
        label="You accept our Terms and Conditions and Privacy Policy"
        value={checked}
        onChange={() => setChecked(!checked)}
      />
      <button
        type="submit"
        className="btn btn-dark block w-full text-center"
        disabled={!checked} // Ensure checkbox is checked
      >
        Create an account
      </button>
    </form>
  );
};

export default RegForm;