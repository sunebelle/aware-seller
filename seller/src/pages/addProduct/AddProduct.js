import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories, getAllSubCategories } from "../../actions/category";
import { createProduct } from "../../actions/product";
import MultipleSelectChip from "../../components/Select/MultipleSelectChip";
import MultipleSelectObj from "../../components/Select/MultipleSelectObj";
import Select from "../../components/Select/Select";
import Topbar from "../../components/Topbar/Topbar";
import Upload from "../../components/UploadImg/Upload";
import { sizes, brands, colors } from "../../utils/listData";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [category, setCategory] = useState([]); //Ladies/Dress => mini dress id
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();

  const { categories, subCategories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      const dressCategory = categories[0].categories.find(
        (category) => category.name === "Dresses"
      );
      const dressCategoryId = dressCategory._id;
      dispatch(getAllSubCategories(dressCategoryId));
    }
  }, [categories, dispatch]);
  // console.log(subCategories);

  useEffect(() => {
    setFiles((files) => [...files, img2, img3, img4]);
  }, [img2, img3, img4]);

  const clearState = () => {
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setBrand("");
    setColor([]);
    setSize([]);
    setCategory([]);
    setImg1("");
    setImg2("");
    setImg3("");
    setImg4("");
  };
  const handleCancel = () => {
    clearState();
  };
  const handleAdd = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("imageCover", img1);
    formData.append("images", files);
    formData.append("quantity", quantity);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("brand", brand);
    formData.append("category", category);
    dispatch(createProduct(formData));
    clearState();
  };

  return (
    <div className="col-span-5 px-5  bg-[#f6f6f6]">
      <Topbar title="Products" path="Products  /  Add product" />
      <form onSubmit={handleAdd} className="mt-[60px] pb-[74px]">
        {/* first grid - upload images */}
        <div className="grid grid-cols-6 gap-5">
          <div className="col-span-1 flex items-center justify-end h-[270px]">
            <h4>photos</h4>
          </div>
          <div className="col-span-4 inline-flex justify-between flex-wrap gap-5 w-full">
            <Upload setImg={setImg1} img={img1} />
            <Upload setImg={setImg2} img={img2} />
            <Upload setImg={setImg3} img={img3} />
            <Upload setImg={setImg4} img={img4} />

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
            <MultipleSelectObj
              listOptions={subCategories}
              selected={category}
              setSelected={setCategory}
            />
          </div>
        </div>
        {/* four grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>Brand</h4>
          </div>
          <div className="col-span-4">
            <Select listOptions={brands} brand={brand} setBrand={setBrand} />
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
            <MultipleSelectChip
              listOptions={sizes}
              selected={size}
              setSelected={setSize}
            />
          </div>
        </div>
        {/* seventh grid */}
        <div className="grid grid-cols-6 gap-5  mb-6">
          <div className="col-span-1 flex items-center justify-end">
            <h4>Colors</h4>
          </div>
          <div className="col-span-4">
            <MultipleSelectChip
              listOptions={colors}
              selected={color}
              setSelected={setColor}
            />
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
            <button
              onClick={handleCancel}
              type="button"
              className="Montserrat btn text-[#ffa15f] border border-[#ededed] bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="Montserrat btn text-white  bg-[#ffa15f]"
            >
              Complete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
