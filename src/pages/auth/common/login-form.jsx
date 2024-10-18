import React, { useEffect, useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
import axios from "axios";
import { base_url } from "../../../config/base_url";
import { v1 as uuidv1 } from 'uuid';




// Validation schema using Yup
const schema = yup
  .object({
    userName: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [deviceId, setDeviceID] = useState("")
  // React Hook Form for managing the form and validations
  // console.log(deviceId,"idddddddddd")
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue, // To manually set form values
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  useEffect(() => {
    // Check if a device ID is already stored in local storage
    let storedDeviceId = localStorage.getItem("deviceId");
    if (!storedDeviceId) {
      storedDeviceId = uuidv1(); // Generate a new UUID if none exists
      localStorage.setItem("deviceId", storedDeviceId); // Store it in local storage
    }
    setDeviceID(storedDeviceId); // Set the device ID in state
  }, []); // Run only once when the component mounts

  const onSubmit = async (data) => {
    try {
      const payload = {
        userName: data.userName,
        password: data.password,
        deviceId: deviceId,
      };
      const response = await axios.post(`${base_url}/api/Login`, payload);
      const {token} = response.data.data
      localStorage.setItem('token',token)
      const { _id } = response.data.data;  
      localStorage.setItem('_id', _id);  
      console.log(_id, "_id"); 
      // console.log(response.data,"resp")
      if (response.status === 200) {
        toast.success("Login successful!");
        dispatch(handleLogin(response.data));
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Username Input */}
      <Textinput
        name="userName"
        label="Username"
        placeholder="Enter your email as username"
        type="text"
        register={register}
        error={errors.userName}
        className="h-[48px]"
      />

      {/* Password Input */}
      <Textinput
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        className="h-[48px]"
      />

      <div className="flex justify-between">
        {/* Checkbox for 'Keep me signed in' */}
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />

        {/* Forgot Password Link */}
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button className="btn btn-dark block w-full text-center" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
