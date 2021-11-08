import React, { useEffect, useState } from "react";

const MultipleSelectObj = ({ listOptions, setSelected, selected }) => {
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const [selectedObj, setSelectedObj] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(""); //for styling on click only

  useEffect(() => {
    if (selected.length === 0) {
      setSelectedObj([]);
    }
  }, [selected]);

  const handleSelect = (option) => {
    setCurrentSelected(option.name);
    if (selectedObj.includes(option)) {
      return;
    }
    setSelectedObj([...selectedObj, option]);
    setSelected([...selected, option._id]);

    // setShowDropdownMenu(false);
  };
  const handleDelete = (selectedId) => {
    setSelected(selected.filter((id) => id !== selectedId));
    setSelectedObj(selectedObj.filter((item) => item._id !== selectedId));
  };
  return (
    <div className="relative">
      <div
        // onClick={() => setShowDropdownMenu((state) => !state)}
        className=" bg-border-select cursor-pointer justify-between pl-2 pr-3 "
      >
        <div className="inline-flex w-full overflow-x-auto scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-100 ">
          {selectedObj?.map((select) => (
            <div
              key={select._id}
              className="flex items-center h-8 bg-[#f6f6f6] rounded px-2 space-x-2 justify-between mr-2"
            >
              <h2>{select.name} </h2>
              <img
                onClick={() => handleDelete(select._id)}
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
        <div className="absolute z-50 px-4 top-12 flex-col shadow-lg bg-border-select h-28 overflow-y-auto scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-100">
          {listOptions?.map((option) => {
            const active = option.name === currentSelected;
            return (
              <div
                key={option._id}
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
                  {option.name}
                </h2>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MultipleSelectObj;
