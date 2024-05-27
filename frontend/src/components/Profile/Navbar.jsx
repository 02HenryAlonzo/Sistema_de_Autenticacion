import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from '../../utils/logout'

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="bg-[#fafafb] py-5 px-3 sm:px-20 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/" className="text-lg font-bold">
          <div className="flex justify-center items-center gap-2">
            <img src="./logo.png" alt="" className="w-8 h-7" />
            HealWebCode
          </div>
        </Link>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-500 hover:text-gray-900"
        >
          <i className="fa-regular fa-user mr-2 text-2xl"></i>
          Profile
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 top-11 w-[188px] h-[175px] bg-white rounded-2xl border-[1px] border-gray-300 shadow-md z-10 p-3 text-gray-600">
            <Link to="/profile">
              <div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl mb-1">
                <div className="w-5 h-5">
                  <i className="fa-solid fa-circle-user text-[20px]"></i>
                </div>
                <p className="">My Profile</p>
              </div>
            </Link>
            <Link to="#" className="block border-b-2 border-gray-300">
              <div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl mb-3">
                <div className="w-5 h-5">
                  <i className="fa-solid fa-user-group text-[18px]"></i>
                </div>
                <p className="">Group Chat</p>
              </div>
            </Link>
            <button onClick={handleLogout}>
              <div className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-xl mt-4 text-red-500">
                <div className="w-5 h-5">
                  <i className="fa-solid fa-right-to-bracket text-[20px]"></i>
                </div>
                <p className="">Logout</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
