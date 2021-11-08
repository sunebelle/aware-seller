import React from "react";
// import React, { useState } from "react";

const Upload = ({ img, setImg }) => {
  // const [img, setImg] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImg(URL.createObjectURL(img));
    }
  };

  const deleteImg = (img) => {
    setImg("");
  };

  return (
    <div>
      <div className=" relative 2xl:w-[180px]  w-[160px] h-[270px] border border-[#ededed] bg-[#ffffff] flex flex-col items-center justify-center">
        {img && (
          <img
            className=" w-full h-[270px] object-fill"
            src={img}
            alt="upload"
          />
        )}
        {!img && (
          <>
            <div className="h-6 w-6 relative">
              <img className="w-6 h-6" src="/img/add.svg" alt="add" />
              <input
                className="absolute top-0 left-0 w-6 h-6 opacity-0 "
                type="file"
                name="files"
                onChange={onImageChange}
              />
            </div>
            <span className="mt-2 Montserrat text-[#acacac] text-xs font-medium leading-[1.83rem]">
              Add photo
            </span>
          </>
        )}
        {img && (
          <div className="absolute top-2 right-2  z-50">
            <img
              onClick={() => deleteImg(img)}
              className="w-6 h-6 "
              src="/img/close-1.svg"
              alt="close 1"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
