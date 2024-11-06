"use client";

import Loading from "@/app/components/Loading";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import Swal from "sweetalert2";

const EditProduct = () => {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/onlineshop/api/products/${id}`)
        .then((response) => {
          const { image, name, desc, qty, price } = response.data;
          setImagePreview(image);
          setName(name);
          setDesc(desc);
          setQty(qty);
          setPrice(price);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
          Swal.fire("Error", "Could not fetch product data", "error");
        });
    }
  }, [id]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        Swal.fire("Error", "File size exceeds 5MB", "error");
        return;
      }
      setImage(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("qty", qty);
    formData.append("price", price);

    try {
      const response = await axios.put(
        `http://localhost:4000/onlineshop/api/products/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        await Swal.fire({
          title: "Success!",
          text: "Product updated successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
        router.push("/");
      } else {
        await Swal.fire({
          title: "Error!",
          text: "Update failed. Please check your input.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Update error:", error);
      await Swal.fire({
        title: "Error!",
        text: "Update failed. Please try again.",
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
                Edit Item
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
                  onClick={handleFileSelect}
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
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="ml-4 w-16 h-16 object-cover"
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
                  rows={4}
                />
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
                  step="0.01"
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

export default EditProduct;
