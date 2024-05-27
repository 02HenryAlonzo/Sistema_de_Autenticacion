import React from 'react';

export const ProfileField = ({ label, value }) => {
  return (
    <div className="border-b-2 border-gray-300 py-4 first:pt-0 sm:first:pt-4 last:border-0 flex justify-between items-center sm:py-[11px]">
      <div className="text-[13px] text-[#bdbdbd] font-medium uppercase">{label}</div>
      <div className="text-base text-[#333333] font-medium text-right">{value}</div>
    </div>
  );
};
