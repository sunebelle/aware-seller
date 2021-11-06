import React from "react";

const Table = () => {
  return (
    <div className="px-6 bg-white pb-28">
      <table className="w-full table-fixed ">
        <thead className=" border-b">
          <tr>
            <th className="w-2/5 py-[23px] px-6 uppercase Montserrat-s text-left">
              Products
            </th>
            <th className="w-1/5 uppercase Montserrat-s text-left">sold</th>
            <th className="w-1/5 uppercase Montserrat-s text-left">
              Date added
            </th>
            <th className="w-1/5 uppercase Montserrat-s text-left">
              Profit ($)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="flex flex-row py-3 ml-6 h-16 ">
                <img
                  className="w-[30px] h-10  mr-4 object-fill"
                  src="http://1.bp.blogspot.com/-WNYjU9_za3w/UOf-gT_rSVI/AAAAAAAAIPg/Iri_YUeighc/s1600/Purple-Cocktail-Dress-Designs.jpg"
                  alt="product"
                />
                <div className="flex flex-col justify-between">
                  <h2>Collete Stretch Linen Minidress</h2>
                  <p className="Montserrat align-bottom text-xs font-medium leading-[1.83rem] text-[#acacac] ">
                    Women, Casual dresses
                  </p>
                </div>
              </div>
            </td>
            <td>
              <h2 className="text-left">4 / 100</h2>
            </td>
            <td>
              <h2 className="text-left">Today, 8th Aug, 2018</h2>
            </td>
            <td>
              <div className="flex justify-between items-center mr-6">
                <h2 className="text-left">400.00</h2>
                <div className="inline-flex items-center">
                  <span className="Montserrat text-sm font-semibold leading-none text-[#3d3d3f]">
                    Actions
                  </span>
                  <img src="/img/dropdown.svg" alt="dropdown" />
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="flex flex-row py-3 h-16  ml-6 ">
                <img
                  className="w-[30px] h-10  mr-4 object-fill"
                  src="http://1.bp.blogspot.com/-WNYjU9_za3w/UOf-gT_rSVI/AAAAAAAAIPg/Iri_YUeighc/s1600/Purple-Cocktail-Dress-Designs.jpg"
                  alt="product"
                />
                <div className="flex flex-col justify-between">
                  <h2>Collete Stretch Linen Minidress</h2>
                  <p className="Montserrat text-xs align-bottom font-medium leading-[1.83rem] text-[#acacac] ">
                    Women, Casual dresses
                  </p>
                </div>
              </div>
            </td>
            <td>
              <h2 className="text-left">4 / 100</h2>
            </td>
            <td>
              <h2 className="text-left">Today, 8th Aug, 2018</h2>
            </td>
            <td>
              <div className="flex justify-between items-center mr-6">
                <h2 className="text-left">400.00</h2>
                <div className="inline-flex items-center">
                  <span className="Montserrat text-sm font-semibold leading-none text-[#3d3d3f]">
                    Actions
                  </span>
                  <img src="/img/dropdown.svg" alt="dropdown" />
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
