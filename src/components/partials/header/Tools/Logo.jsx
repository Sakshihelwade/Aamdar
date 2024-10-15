import React from "react";
import useDarkMode from "@/hooks/useDarkMode";
import { Link } from "react-router-dom";
import useWidth from "@/hooks/useWidth";

import MainLogo from "@/assets/images/logo/logo.svg";
import LogoWhite from "@/assets/images/logo/logo-white.svg";
import MobileLogo from "@/assets/images/logo/logo-c.svg";
import MobileLogoWhite from "@/assets/images/logo/logo-c-white.svg";
// import DMANDLOGO from "@/assets/images/logo/DMAND-logo.jpg";
import Logos from '../../../../assets/images/logo/Logo.jpg'

const Logo = () => {
  const [isDark] = useDarkMode();
  const { width, breakpoints } = useWidth();

  return (
    <div>
      <Link to="/dashboard">
        {width >= breakpoints.xl ? (
          <img src={Logos} alt="" />
        ) : (
          <img src={Logos} alt="" style={{width:"150px"}}/>
        )}
      </Link>
    </div>
  );
};

export default Logo;
