import React, { useState } from "react";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Checkbox from "@/components/ui/Checkbox";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogin } from "./store";
import { toast } from "react-toastify";
const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
  })
  .required();
const LoginForm = () => {
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.auth);
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: "all",
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // const user = users.find(
    //   (user) => user.email === "admin@gmail.com" && user.password === "admin@123"
    // );
    if (email === "admin@gmail.com" && password === "admin@123") {
      dispatch(handleLogin(true));
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      toast.error("Invalid credentials", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const [checked, setChecked] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput
        name="email"
        label="email"
        // defaultValue={users[0].email}
        placeholder="Enter your email address"
        type="email"
        register={register}
        error={errors.email}
        className="h-[48px]"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />
      <Textinput
        name="password"
        label="passwrod"
        type="password"
        // defaultValue={users[0].password}
        placeholder="Enter your password"
        register={register}
        error={errors.password}
        className="h-[48px]"
        value={password}
        onChange={(e) =>setPassword(e.target.value)}
      />
      <div className="flex justify-between">
        <Checkbox
          value={checked}
          onChange={() => setChecked(!checked)}
          label="Keep me signed in"
        />
        <Link
          to="/forgot-password"
          className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium"
        >
          Forgot Password?{" "}
        </Link>
      </div>

      <button className="btn btn-dark block w-full text-center">Sign in</button>
    </form>
  );
};

export default LoginForm;
