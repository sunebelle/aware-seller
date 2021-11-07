import React, { useState } from "react";

const Select = ({ listOptions, setBrand }) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [selected, setSelected] = useState("");

  const handleSelect = (option) => {
    setSelected(option);
    setBrand(option.replace("&", "-"));
    setShowDropdownMenu(false);
  };

  return (
    <div className="relative">
      <div
        onClick={() => setShowDropdownMenu((state) => !state)}
        className=" bg-border-select cursor-pointer justify-between pl-4 pr-3 "
      >
        <h2>{selected} </h2>
        <img
          className={`${showDropdownMenu && "transform rotate-180"}`}
          src="/img/dropdown.svg"
          alt="dropdown"
        />
      </div>
      {showDropdownMenu && (
        <div className="absolute z-50 px-4 top-12 flex-col shadow-lg bg-border-select h-28 overflow-y-auto scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-100">
          {listOptions?.map((option, i) => {
            const active = option === selected;
            return (
              <div
                key={i}
                className="w-full"
                onClick={() => handleSelect(option)}
                onMouseLeave={() => setShowDropdownMenu(false)}
                onMouseEnter={() => setShowDropdownMenu(true)}
              >
                <h2
                  className={`${
                    active && "bg-[#ffa15f]"
                  } cursor-pointer text-right`}
                >
                  {option}
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
