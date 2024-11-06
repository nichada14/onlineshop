"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { IoChevronForwardSharp } from "react-icons/io5";
import Image from "next/image";
import { MdOutlineEdit } from "react-icons/md";
import axios from "axios";
import Loading from "@/app/components/Loading";
import Error from "@/app/components/Error";

interface ProductData {
  id: number;
  name: string;
  image: string;
  price: string;
  desc: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<ProductData>(
          `http://localhost:4000/onlineshop/api/products/${id}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details.");
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    if (id) {
      router.push(`/edit-product/${id}`);
    }
  };

  if (!data) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="mt-[16px] lg:mt-[32px] pb-32 md:pb-30">
      <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:items-start w-[343px] lg:w-[990px]">
      <div className="absolute top-[80px] md:top-[96px] left-0 lg:left-0 w-full">
          <p className="flex items-center h-[24px] lg:justify-start ml-4 xl:ml-40">
            <span className="ml-0">Home</span>
            <IoChevronForwardSharp className="ml-2" />
            <span className="ml-2 text-body2 text-secondary text-opacity-45">
              {data.name}
            </span>
          </p>
        </div>
        <div className="container mx-auto mt-8">
          <div className="flex flex-col md:flex-row items-start justify-center">
          
            {/* image section */}
            <div className="w-full md:w-[483px] mb-5 md:mb-0 flex-shrink-0">
              <Image
                className="object-cover object-center"
                alt={data.name}
                src={data.image}
                width={483}
                height={483}
              />
            </div>

            {/* text section */}
            <div className="w-full md:w-[483px] flex flex-col items-start text-left flex-shrink-0 md:ml-3">
              <h3 className="mb-4 text-heading3 text-primary">{data.name}</h3>
              <h1 className="mb-6 text-heading2 lg:text-heading1 text-primary">
                ${data.price}
              </h1>
              <p className="mb-6 text-body2 text-primary">{data.desc}</p>
              <div className="flex justify-center md:justify-start">
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center border border-primary50 w-[114px] py-2"
                >
                  <MdOutlineEdit className="text-primary50 mr-2 w-[24px] h-[24px]" />
                  <span className="text-primary50 font-sans text-body2">
                    Edit
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
