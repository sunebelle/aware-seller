import React, { useState } from "react";
import MultipleSelectChip from "../../components/Select/MultipleSelectChip";
import Select from "../../components/Select/Select";
import Topbar from "../../components/Topbar/Topbar";
//https://stackoverflow.com/questions/43692479/how-to-upload-an-image-in-react-js
//https://w3path.com/react-image-upload-or-file-upload-with-preview
//https://codesandbox.io/s/bold-bird-6owyg
const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div className="col-span-5 px-5  bg-[#f6f6f6]">
      <Topbar title="Products" path="Products  /  Add product" />
      <div className="mt-[60px] pb-[74px]">
        {/* first grid - upload images */}
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-1 flex items-center justify-end h-[270px]">
            <h4>photos</h4>
          </div>
          <div className="col-span-4 inline-flex flex-wrap gap-5 w-full">
            {/* single image */}
            <div className=" relative w-[180px] h-[270px] border border-[#ededed] bg-[#ffffff] flex flex-col items-center justify-center">
              {/* <img  className="w-[180px] h-[270px]" src=""  alt="product"/> */}
              <img className="w-6 h-6" src="/img/add.svg" alt="add" />
              <span className="mt-2 Montserrat text-[#acacac] text-xs font-medium leading-[1.83rem]">
                Add photo
              </span>
              <div className="absolute top-2 right-2 ">
                <img
                  className="w-6 h-6 "
                  src="/img/close-1.svg"
                  alt="close 1"
                />
              </div>
            </div>
            {/* single image */}
            <div className=" relative w-[180px] h-[270px] border border-[#ededed] bg-[#ffffff] flex flex-col items-center justify-center">
              {/* <img  className="w-[180px] h-[270px]" src=""  alt="product"/> */}
              <img className="w-6 h-6" src="/img/add.svg" alt="add" />
              <span className="mt-2 Montserrat text-[#acacac] text-xs font-medium leading-[1.83rem]">
                Add photo
              </span>
              <div className="absolute top-2 right-2 ">
                <img
                  className="w-6 h-6 "
                  src="/img/close-1.svg"
                  alt="close 1"
                />
              </div>
            </div>
            {/* single image */}
            <div className=" relative w-[180px] h-[270px] border border-[#ededed] bg-[#ffffff] flex flex-col items-center justify-center">
              {/* <img  className="w-[180px] h-[270px]" src=""  alt="product"/> */}
              <img className="w-6 h-6" src="/img/add.svg" alt="add" />
              <span className="mt-2 Montserrat text-[#acacac] text-xs font-medium leading-[1.83rem]">
                Add photo
              </span>
              <div className="absolute top-2 right-2 ">
                <img
                  className="w-6 h-6 "
                  src="/img/close-1.svg"
                  alt="close 1"
                />
              </div>
            </div>

            <p className="Montserrat text-sm mb-10 font-medium leading-[1.43rem] text-[#acacac] ">
              You can add up to 8 photos. The 1st photo will be set as cover
              (main photo).
            </p>
          </div>
        </div>
        {/* second grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>name</h4>
          </div>
          <div className="col-span-4">
            <input
              className="Montserrat bg-border-input text-[#3d3d3f]"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        {/* third grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>categories</h4>
          </div>
          <div className="col-span-4">
            <MultipleSelectChip />
          </div>
        </div>
        {/* four grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>Brand</h4>
          </div>
          <div className="col-span-4">
            <Select />
          </div>
        </div>
        {/*  fifth grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>Price ($)</h4>
          </div>
          <div className="col-span-4">
            <input
              className="Montserrat bg-border-input text-[#3d3d3f]"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        {/* sixth grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>size</h4>
          </div>
          <div className="col-span-4">
            <MultipleSelectChip />
          </div>
        </div>
        {/* seventh grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>Colors</h4>
          </div>
          <div className="col-span-4">
            <MultipleSelectChip />
          </div>
        </div>
        {/* eightth grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>Quantity</h4>
          </div>
          <div className="col-span-4">
            <input
              className="Montserrat bg-border-input text-[#3d3d3f]"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        {/* ninth grid */}
        <div className="grid grid-cols-6 gap-5  mb-10">
          <div className="col-span-1 flex items-center justify-end">
            <h4>description</h4>
          </div>
          <div className="col-span-4">
            <textarea
              className="Montserrat bg-border-textarea text-[#3d3d3f]"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        {/* Button part */}
        <div className="grid grid-cols-6 gap-5 ">
          <div className="col-span-1 flex items-center justify-end"></div>
          <div className="col-span-4 inline-flex justify-end space-x-5">
            <button className="Montserrat btn text-[#ffa15f] border border-[#ededed] bg-white">
              Cancel
            </button>
            <button className="Montserrat btn text-white  bg-[#ffa15f]">
              Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
