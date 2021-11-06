import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-1 bg-gray-400">
        <Sidebar />
      </div>
      <div className="grid-cols-6 bg-red-300">
          {children}
      </div>
    </div>
  );
};

export default Layout;
