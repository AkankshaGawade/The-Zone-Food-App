import React from "react";
import { BsFillBellFill, BsToggles2 } from "react-icons/bs";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdLogout, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { buttonClick } from "../animations";
import { motion } from "framer-motion";
import { Avatar } from "../assets";
import { useDispatch } from "react-redux";
import { app } from "../config/firebase.config";
import { getAuth } from "firebase/auth";
import { setUserNull } from "../context/actions/userActions";

const DBHeader = () => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("./login", { replace: true });
      })
      .catch((err) => console.log(err));
  };
  const user = useSelector((state) => state.user);
  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl text-headingColor">
        Welcome to  The Zone
        <br />
        {user?.name && (
          <span className="block text-base text-black">{`Hello ${user?.name}.!`}</span>
        )}
      </p>

      <div className="flex items-center justify-center gap-4">
        <div className="flex items-center justify-center gap-3 py-2 px-4 bg-slate-50 backdrop-blur-md rounded-md shadow-md">
          <MdSearch className="text-black text-2xl" />
          <input
            type="text"
            placeholder="Search here.."
            className="border-none  w-32 text-base font-semibold text-black"
          />
          <BsToggles2 className="text-black text-2xl" />
        </div>

        <motion.div
          {...buttonClick}
          className="w-10 h-10 rounded-md cursor-pointer bg-slate-50 backdrop-blur-md flex items-center justify-center"
        >
          <BsFillBellFill className="text-gray-400 text-xl" />
        </motion.div>

        <div className="flex items-center justify-center gap-2 ">
          <div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
            <motion.img
              className="w-full h-full object-cover"
              src={user?.picture ? user?.picture : Avatar}
              whileHover={{ scale: 1.15 }}
              referrerPolicy="no-referrer"
            />
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default DBHeader;
