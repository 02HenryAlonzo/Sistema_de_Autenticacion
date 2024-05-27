import React from 'react';

export const ProfileFormField = ({ label, type, value, onChange, className, name }) => {
  return (
    <div className="mb-5">
      <label className="block text-[13px] font-medium ">{label}</label>
      <input 
        type={type} 
        value={value || ''} 
        onChange={onChange} 
        name={name}
        className={`h-12 w-full sm:w-[420px] border-[1px] border-[#828282] rounded-xl text-[13px] placeholder-gray-400 pl-5 bg-[#fafafb] ${className}`}
        placeholder={`Enter your ${label.toLowerCase()}...`} 
      />
    </div>
  );
};

