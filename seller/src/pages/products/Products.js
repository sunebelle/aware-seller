import React from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table/Table";
import Topbar from "../../components/Topbar/Topbar";

const Products = () => {
  return (
    <div className="col-span-5 px-5 pb-8 bg-[#f6f6f6]">
      <Topbar title="Products" />
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center ">
          <span className="uppercase mr-5 Montserrat text-xs font-semibold text-[#acacac] leading-[1.5rem]">
            Sort by
          </span>
          <div className="w-[172px] justify-between px-4 flex-row bg-border-white">
            <h2 className=" pr-6 ">Date added</h2>
            <img src="/img/dropdown.svg" alt="dropdown" />
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <div className="w-[280px] bg-border-white ">
            <div className="pl-4 pr-2">
              <img className="w-6 h-6" src="/img/search.svg" alt="search" />
            </div>
            <input
              type="text"
              placeholder="Search product"
              className=" flex-grow Montserrat text-sm leading-none font-medium text-[#acacac] bg-[#ffff] focus:outline-none border-none"
            />
          </div>
          <Link to="/products/add-product">
            <button className="w-[156px] px-4 inline-flex items-center h-12 bg-[#ffa15f] rounded-sm Montserrat font-semibold text-sm leading-[1.71rem] text-white">
              <img src="/img/plus-white.svg" alt="plus white" />
              <span className="pl-2"> Add product</span>
            </button>
          </Link>
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

export default Products;
