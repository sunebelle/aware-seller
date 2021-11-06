import React, { useState } from "react";
import { Link } from "react-router-dom";
import menu from "./menu";

const Sidebar = () => {
  const [select, setSelect] = useState("Orders");
  return (
    <div className=" h-screen col-span-1 sticky top-0 bg-[#f6f6f6] border-r">
      <div className="h-[104px] flex items-center justify-center ">
        <img
          className="w-[132px] h-7 object-fill"
          src="/img/logo-black.svg"
          alt="logo"
        />
      </div>
      <ul>
        {menu.map((item) => {
          const active = select === item.name;
          return (
            <Link
              key={item.id}
              onClick={() => setSelect(item.name)}
              to={item.link}
            >
              <li
                className={`${
                  active ? "border-[#ffa15f]" : "border-[#f6f6f6]"
                } flex flex-row items-center py-[14px] mb-2 border-l-[6px]`}
              >
                <img
                  className="px-5"
                  src={active ? item.clickImg : item.img}
                  alt={item.name}
                />
                <span
                  className={`${
                    active ? "text-[#ffa15f]" : "text-[#3d3d3f]"
                  } Montserrat text-sm font-medium leading-[1.43rem] `}
                >
                  {item.name}
                </span>
              </li>
            </Link>
          );
        })}
        {/* <Link>
          <li className="flex flex-row items-center py-[14px] mb-2">
            <img className="px-5" src="/img/products-dark.svg" alt="" />
            <span className="Montserrat text-sm font-medium leading-[1.43rem] text-[#3d3d3f]">
              Products
            </span>
          </li>
        </Link> */}
      </ul>
    </div>
  );
};

export default Sidebar;
