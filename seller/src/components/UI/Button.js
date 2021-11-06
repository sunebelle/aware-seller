import React from "react";

const Button = ({ label, btnDisabled, type, handleChange, redBgColor }) => {
  const isActive = !btnDisabled
    ? redBgColor
      ? "bg-[#ff5f6d] cursor-pointer "
      : "bg-[#ffa15f] cursor-pointer "
    : "cursor-not-allowed bg-[#d4d3d3]  ";

  return (
    <button
      type={type}
      onClick={handleChange}
      disabled={btnDisabled}
      className={`${isActive} h-12 w-full text-center rounded-sm py-2.5 Montserrat text-[14px] font-semibold leading-[1.71rem]  text-white`}
    >
      {label}
    </button>
  );
};

export default Button;
