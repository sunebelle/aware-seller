import React from "react";

const Topbar = ({ title, path }) => {
  return (
    <div className="h-[104px] relative flex justify-between items-center">
      <h1 className="Montserrat font-bold text-[28px] text-[#202124] leading-[1.29rem]">
        {title}
      </h1>
      <div className="flex flex-nowrap items-center">
        <img
          className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
          src="https://tse2.mm.bing.net/th?id=OIP.v1TN-99d_yxTDoUKZShUMAHaHa&pid=Api&P=0&w=300&h=300"
          alt="avatar"
        />
        <p className="ml-3 Montserrat text-sm font-bold leading-[1.71rem] text-[#202124]">
          Lucile Bush
        </p>
        <img src="/img/dropdown.svg" alt="dropdown" />
        <div className="relative mx-8">
          <img src="/img/mail.svg" alt="mail" />
          <p className=" absolute -top-2 -right-2.5 w-5 h-4 rounded-lg  bg-[#f63f45] text-center pt-0.5 text-[10px] leading-none font-bold text-white">
            9+
          </p>
        </div>
        <div className="relative mr-5">
          <img src="/img/notification.svg" alt="notification" />
          <p className=" absolute -top-2 -right-2.5 w-5 h-4 rounded-lg  bg-[#f63f45] text-center pt-0.5 text-[10px] leading-none font-bold text-white">
            9+
          </p>
        </div>
      </div>
      <h2 className="absolute mt-[76px] align-text-bottom">{path}</h2>
    </div>
  );
};

export default Topbar;
