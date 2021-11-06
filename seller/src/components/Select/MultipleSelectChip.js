import React, { useState } from "react";

const MultipleSelectChip = () => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [selected, setSelected] = useState([]);
  const [currentSelected, setCurrentSelected] = useState("");

  const listOptions = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const handleSelect = (option) => {
    setSelected([...selected, option]);
    setCurrentSelected(option);
    // setShowDropdownMenu(false);
  };
  const handleDelete = (select) => {
    setSelected(selected.filter((item) => item !== select));
  };
  return (
    <div className="relative">
      <div
        // onClick={() => setShowDropdownMenu((state) => !state)}
        className=" bg-border-select cursor-pointer justify-between pl-2 pr-3 "
      >
        <div className="inline-flex ">
          {selected?.map((select, i) => (
            <div className="flex items-center h-8 bg-[#f6f6f6] rounded px-2 space-x-2 justify-between mr-2">
              <h2 key={i}>{select} </h2>
              <img
                onClick={() => handleDelete(select)}
                className="w-4 h-4"
                src="/img/close-2.svg"
                alt="close"
              />
            </div>
          ))}
        </div>
        <img
          onClick={() => setShowDropdownMenu((state) => !state)}
          className={`${showDropdownMenu && "transform rotate-180"}`}
          src="/img/dropdown.svg"
          alt="dropdown"
        />
      </div>
      {showDropdownMenu && (
        <div className="absolute z-50 px-4 top-12 flex-col shadow-lg bg-border-select h-40 overflow-y-auto scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-100">
          {listOptions?.map((option, i) => {
            const active = option === currentSelected;
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

export default MultipleSelectChip;
