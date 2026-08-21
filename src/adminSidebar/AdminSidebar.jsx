import React, { useState } from "react";
import { FaAngleDown, FaHome, FaUsers } from "react-icons/fa";
import { routeConstants } from "../utils/routeConstant";
import { useLocation, useNavigate } from "react-router-dom";
export default function AdminSidebar() {
  const [expandedSections, setExpandedSections] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const menItems = [
    {
      id: "home",
      label: "Home",
      icon: <FaHome />,
      path: routeConstants.HOME_PAGE,
    },
    {
      id: "auctionManagement",
      label: "Auction Management",
      icon: <FaUsers />,
      children: [
        {
          id: "auctionList",
          label: "Auction List",
          path: routeConstants.ADMIN_AUCTION_LIST,
        },
       
      ],
    },
     {
      id: "userManagement",
      label: "User Management",
      icon: <FaUsers />,
      path: routeConstants.ADMIN_USER_LIST,
      // children: [
      //   {
      //     id: "createUser",
      //     label: "Create User",
      //     path: routeConstants.ADMIN_USER_CREATE,
      //   },
      //   {
      //     id: "userList",
      //     label: "User List",
      //     path: routeConstants.ADMIN_USER_LIST,
      //   },
       
      // ],
    },
  ];
  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };
  return (
    <div className="w-[250px] h-screen bg-[#f2f0f1] text-black py-2 font-['Segoe_UI',sans-serif] border-r-2 border-white">
      <ul className="list-none p-0 m-0">
        {menItems?.map((item) => (
          <li key={item?.id}>
            <div
              className={`flex items-center py-[10px] px-5 cursor-pointer rounded-lg text-sm font-medium transition-colors duration-300 hover:bg-[#e0e0e0] ${
                item?.path === location?.pathname
                  ? "text-[#673ab7] font-bold"
                  : "text-black/60"
              }`}
              onClick={() =>
                item?.children
                  ? toggleSection(item?.id)
                  : handleNavigation(item?.path)
              }
            >
              <span className="mr-[10px]">{item?.icon}</span>
              <span>{item?.label}</span>
              {item?.children && (
                <FaAngleDown
                  className={`ml-auto transition-transform duration-300 ${
                    expandedSections[item?.id] ? "rotate-180" : ""
                  } `}
                />
              )}
            </div>
            {item?.children && expandedSections[item?.id] && (
              <ul className="list-none pl-8 cursor-pointer rounded-lg transition-colors duration-300">
                {item?.children?.map((subItem) => (
                  <li
                    className={`py-[5px] px-[10px] text-sm font-medium cursor-pointer transition-colors duration-200 ${
                      subItem?.path === location?.pathname
                        ? "text-[#673ab7] font-bold"
                        : "text-black/60"
                    }`}
                    key={subItem?.id}
                    onClick={() => handleNavigation(subItem?.path)}
                  >
                    {subItem?.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
