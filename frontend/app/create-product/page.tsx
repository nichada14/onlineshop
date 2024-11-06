"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("qty", qty);
    formData.append("price", price);

    try {
      const response = await axios.post(
        "http://localhost:4000/onlineshop/api/products/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      await Swal.fire({
        title: "Success!",
        text: "You have registered successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });

      router.push("/");
    } catch (error) {
      console.error(error);
      await Swal.fire({
        title: "Error!",
        text: "Registration failed. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[343px] lg:w-[483px] mx-auto">
        <div className="container px-4 mx-auto">
          <div className="max-w-lg mx-auto py-8">
            <div className="text-center mb-8">
              <h2 className="text-heading3 text-primary font-sans mb-2">
                Add Item
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6 flex items-center">
                <label
                  className="block mb-2 font-sans text-body2 text-primary mr-4"
                  htmlFor="image"
                >
                  Image
                </label>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center border border-primary50 w-[114px] py-2"
                >
                  <MdOutlineFileUpload className="text-primary50 mr-2 w-[24px] h-[24px]" />
                  <span className="text-primary50 font-sans text-body2">
                    Upload
                  </span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="preview"
                    className="ml-4 w-[100px] object-cover"
                  />
                )}
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 font-sans text-body2 text-primary"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="block w-full h-[38px] p-2 leading-6 border border-grey80"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 font-sans text-body2 text-primary"
                  htmlFor="desc"
                >
                  Description
                </label>
                <textarea
                  className="block w-full h-[98px] p-2 leading-6 border border-grey80"
                  id="desc"
                  name="desc"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 font-sans text-body2 text-primary"
                  htmlFor="qty"
                >
                  Quantity
                </label>
                <input
                  className="block w-full h-[38px] p-2 leading-6 border border-grey80"
                  type="number"
                  id="qty"
                  name="qty"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 font-sans text-body2 text-primary"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  className="block w-full h-[38px] p-2 leading-6 border border-grey80"
                  type="number"
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <button className="w-full h-[38px] text-center text-lg leading-6 text-white text-body2 font-sans bg-primary50">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
