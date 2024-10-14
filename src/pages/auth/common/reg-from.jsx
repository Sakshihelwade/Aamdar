import React, { useState } from "react";
import { toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import Select from "@/components/ui/Select"; // Assuming you're using a Select component
import { handleRegister } from "./store";

const schema = yup
  .object({
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
    role: yup.string().required("Role selection is required"),
  })
  .required();

const RegForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [role, setRole] = useState(""); // State for role
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const onSubmit = (data) => {
    dispatch(handleRegister({ ...data, role })); // Pass role with data
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  const options = [
    { label: "Admin", value: "Admin" },
    { label: "Surveyer", value: "Surveyer" },
    { label: "Karyakarta", value: "Karyakarta" },
    { label: "Other", value: "Other" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-2 gap-2">
      <Textinput
        name="voterId"
        label="Voter ID"
        type="text"
        placeholder="Enter your Voter ID"
        register={register}
        error={errors.voterId}
        // className="h-[48px]"
      />
      <Textinput
        name="name"
        label="Name"
        type="text"
        placeholder="Enter your name"
        register={register}
        error={errors.name}
        // className="h-[48px]"
      />
      <Textinput
        name="mobile"
        label="Mobile"
        type="number"
        placeholder="Enter your mobile"
        register={register}
        error={errors.mobile}
        // className="h-[48px]"
      />
      <Textinput
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        register={register}
        error={errors.email}
        // className="h-[48px]"
      />
      <Select
        label="Role"
        className="w-full"
        placeholder="Select Role"
        value={role}
        onChange={(e) => setRole(e.target.value)} // Handle role selection
        options={options}
        error={errors.role} // Handle role validation error
      />
      <Textinput
        name="userId"
        label="userId"
        type="text"
        placeholder="Enter your userId"
        register={register}
        error={errors.userId}
        // className="h-[48px]"
      />
      <Textinput
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        // className="h-[48px]"
      />
      <Textinput
        name="confirmpassword"
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        register={register}
        error={errors.confirmpassword}
        // className="h-[48px]"
      />
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
