import React from "react";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import UserAvatar from "@/assets/images/all-img/user.png";
import axios from "axios";
import { base_url } from "../../../../config/base_url";

const profileLabel = () => {
  return (
    <div className="flex items-center">
      <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img
            src={UserAvatar}
            alt=""
            className="block w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap w-[85px] block">
          Admin
        </span>
        <span className="text-base inline-block ltr:ml-[10px] rtl:mr-[10px]">
          <Icon icon="heroicons-outline:chevron-down"></Icon>
        </span>
      </div>
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const id = localStorage.getItem('_id')
  // const storedDeviceId = localStorage.getItem("deviceId");
  
  const handleLogout = async () => {
    const userName = localStorage.getItem("userName"); 
    const id = localStorage.getItem("_id");
    const storedDeviceId = localStorage.getItem("deviceId");
  
    const payload = {
      userName: userName, 
      deviceId: storedDeviceId,
    };
  
    console.log(payload, "...................payload");
  
    try {
      const response = await axios.post(`${base_url}/api/logout`, payload);
      console.log(response.data, "Logout response");
  
      if (response.status === 200) { 
        localStorage.removeItem("userName");
        localStorage.removeItem("_id");
        localStorage.removeItem("deviceId");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ProfileMenu = [
    {
      label: "Register",
      icon: "heroicons-outline:credit-card",
      action: () => {
        navigate("/register");
      },
    },
    {
      label: "Logout",
      icon: "heroicons-outline:login",
      action: () => {
        handleLogout(); 
      },
    },
  ];

  return (
    <Dropdown label={profileLabel()} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div
              onClick={() => item.action()}
              className={`${active
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50"
                  : "text-slate-600 dark:text-slate-300"
                } block ${item.hasDivider
                  ? "border-t border-slate-100 dark:border-slate-700"
                  : ""
                }`}
            >
              <div className="block cursor-pointer px-4 py-2">
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
