import React from "react";

const Input = ({ label, type, name, placeholder, handleChange, value }) => {
  return (
    <div className="mt-3">
      <label className="uppercase Montserrat font-semibold text-[#acacac] text-xs leading-6">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="text-[#acacac] mt-1 bg-border-input Montserrat"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
