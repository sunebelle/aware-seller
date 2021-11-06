import React, { useState } from "react";
import moment from "moment";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import Table from "../../components/Table/Table";
import Topbar from "../../components/Topbar/Topbar";

const Orders = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };
  const handleSelect = (range) => {
    // console.log(range);
    setStartDate(range.selection.startDate);
    setEndDate(range.selection.endDate);
  };

  return (
    <div className="col-span-5 px-5 pb-8 bg-[#f6f6f6]">
      <Topbar title="Orders" />
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center ">
          <span className="uppercase mr-5 Montserrat text-xs font-semibold text-[#acacac] leading-[1.5rem]">
            Ordered date
          </span>
          <div className="w-60 relative bg-border-white justify-between px-4 flex-row ">
            <h2 className=" pr-6">
              {moment(startDate).format("L")} {" - "}
              {moment(endDate).format("L")}
            </h2>
            <img
              onClick={() => setIsCalendarOpen((state) => !state)}
              src="/img/calendar.svg"
              alt="calendar"
            />
            {isCalendarOpen && (
              <div className="absolute top-12 left-0">
                <DateRange
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  // onMouseLeave={() => setIsCalendarOpen(false)}
                  minDate={new Date()}
                  rangeColors={["#ffa15f"]}
                  className="text-xl "
                />
              </div>
            )}
          </div>
          <div className="w-20 bg-border-white justify-center mx-2 ">
            <h2>Today</h2>
          </div>
          <div className="w-[110px] bg-border-white justify-center ">
            <h2>Yesterday</h2>
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-[280px]  bg-border-white">
            <div className="pl-4 pr-2">
              <img className="w-6 h-6" src="/img/search.svg" alt="search" />
            </div>
            <input
              type="text"
              placeholder="Search product"
              className=" flex-grow Montserrat text-sm leading-none font-medium text-[#acacac] bg-[#ffff] focus:outline-none border-none"
            />
          </div>

          <button className="w-[112px] px-4  bg-border-white Montserrat font-semibold text-sm leading-[1.71rem] text-[#ffa15f]">
            <img src="/img/export-orange.svg" alt="export orange" />
            <span className="pl-2"> Export</span>
          </button>
        </div>
      </div>
      <div className="my-8 w-full">
        <Table />
      </div>
    </div>
  );
};

export default Orders;
