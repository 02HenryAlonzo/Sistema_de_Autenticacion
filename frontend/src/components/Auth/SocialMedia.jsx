import React from "react";

export const SocialMedia = () => {
  return (
    <div className="flex justify-center gap-2 mt-8 sm:mt-6">
      <div className="w-11 h-11 border-2 border-gray-300 flex justify-center items-center rounded-full text-lg text-gray-400 cursor-pointer">
        <i className="fa-brands fa-google"></i>
      </div>
      <div className="w-11 h-11 border-2 border-gray-300 flex justify-center items-center rounded-full text-lg text-gray-400 cursor-pointer">
        <i className="fa-brands fa-square-facebook"></i>
      </div>
      <div className="w-11 h-11 border-2 border-gray-300 flex justify-center items-center rounded-full text-lg text-gray-400 cursor-pointer">
        <i className="fa-brands fa-twitter"></i>
      </div>
      <div className="w-11 h-11 border-2 border-gray-300 flex justify-center items-center rounded-full text-lg text-gray-400 cursor-pointer">
        <i className="fa-brands fa-github"></i>
      </div>
    </div>
  );
};
