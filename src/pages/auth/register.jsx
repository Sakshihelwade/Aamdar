import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import RegForm from "./common/reg-from";
import Social from "./common/social";
import { ToastContainer } from "react-toastify";
// image import
import TABLETLOGIN from "@/assets/images/auth/Tablet-login.gif";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import Logo from "@/assets/images/logo/logo.svg";
import Illustration from "@/assets/images/auth/ils1.svg";

const register = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <ToastContainer />

      <div className="loginwrapper">
        <div className="lg-inner-column">
          <div className="left-column relative z-[1]">
            
            <div className="absolute left-0 2xl:bottom-[-160px] bottom-[-130px] h-full w-full z-[-1]">
              <img
                src={TABLETLOGIN}
                alt=""
                className="h-[450px] w-full object-contain"
              />
            </div>
          </div>
          <div className="right-column relative bg-white dark:bg-slate-800">
            <div className="inner-content h-full flex flex-col bg-white dark:bg-slate-800">
              <div className="auth-box h-full flex flex-col justify-center">
                <div className="mobile-logo text-center mb-6 lg:hidden block">
                  <Link to="/">
                    <img
                      src={isDark ? LogoWhite : Logo}
                      alt=""
                      className="mx-auto"
                    />
                  </Link>
                </div>
                <div className="text-center 2xl:mb-10 mb-5">
                  <h4 className="font-medium">Sign up</h4>
                  <div className="text-slate-500 dark:text-slate-400 text-base">
                    Create an account to start using Dashcode
                  </div>
                </div>
                <RegForm />

                {/* <div className="max-w-[215px] mx-auto font-normal text-slate-500 dark:text-slate-400 2xl:mt-12 mt-6 uppercase text-sm">
                  Already registered?
                  <Link
                    to="/"
                    className="text-slate-900 dark:text-white font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </div> */}
              </div>
              <div className="auth-footer text-center">
                Copyright 2021, Dashcode All Rights Reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default register;
