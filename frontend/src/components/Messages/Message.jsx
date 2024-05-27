import React from "react";

export const Message = ({ message, type, visible, className }) => {
  if (!visible) return null;

  const messageStyles = {
    success: "bg-green-100 text-green-700 border border-green-300 py-2 pl-3",
    error: "text-red-500",
    warning: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  };

  return (
    <div className={`rounded-md ${className} ${messageStyles[type]}`}>
      {message}
    </div>
  );
};

