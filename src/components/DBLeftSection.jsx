import React from "react";
import { Logo } from "../assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import {DBOrders} from "./DBOrders"

const DBLeftSection = () => {
  return (
    <div className="h-full bg-slate-50 py-12 flex flex-col backdrop-blur-md shadow-md min-w-210 w-300 gap-4">
      <NavLink to={"/"} className="flex items-center justify-start gap-4 px-6">
        <img src={Logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">City</p>
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-4">
     
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-700`
              : isNotActiveStyles
          }
          to={"/dashboard/orders"}
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-700`
              : isNotActiveStyles
          }
          to={"/dashboard/items"}
        >
          Items
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-700`
              : isNotActiveStyles
          }
          to={"/dashboard/newItem"}
        >
          Add New Item
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-2 border-l-8 border-red-700`
              : isNotActiveStyles
          }
          to={"/dashboard/user"}
        >
          Users
        </NavLink>
      </ul>
      <div className="w-full items-center justify-center flex h-225 mt-auto px-2">
        <div className="w-full h-full rounded-md bg-red-700 flex items-center justify-center flex-col gap-3 px-3">
          <div className="w-12 h-12 brode bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-red-500">?</p>
          </div>
          <p className="text-xl text-black font-semibold">Help Center</p>
          <p className="text-base text-black text-center">
            Having trouble in city.Please contact us for more questions
          </p>
          <p className="px-4 py-2 rounded-full bg-primary text-red-700 cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>
    </div>
  );
};

export default DBLeftSection;
