"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IoChevronForwardSharp } from 'react-icons/io5';
import Image from 'next/image';
import { MdOutlineEdit } from 'react-icons/md';
import axios from 'axios';
import Loading from '@/app/components/Loading';
import Error from '@/app/components/Error';

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
            const res = await axios.get<ProductData>(`http://localhost:4000/onlineshop/api/products/${id}`);
            setData(res.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            setError('Failed to fetch product details.');
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
        <div className='pb-[12px] md:pb-[12px]'>
            <div className="absolute top-[80px] md:top-[96px] left-[16px] md:left-[192px]">
                <p className="flex items-center justify-start max-w-[400px] h-[24px]">
                    Home <IoChevronForwardSharp className="ml-2" /> <span className="ml-2">{data.name}</span>
                </p>
            </div>
            <div className="container mx-auto flex flex-col items-center justify-center md:flex-row md:items-start mt-16">

                {/* image section */}
                <div className="w-[483px] mb-5 md:mb-0 flex-shrink-0 md:mr-3">
                    <Image
                        className="object-cover object-center rounded"
                        alt={data.name}
                        src={data.image}
                        width={483}
                        height={483}
                    />
                </div>
                
                {/* text section */}
                <div className="w-[483px] flex flex-col items-start text-left flex-shrink-0 md:ml-3">
                    <h3 className="mb-4 text-heading3 text-primary">{data.name}</h3>
                    <h1 className="mb-6 text-heading1 text-primary">${data.price}</h1>
                    <p className='mb-6 text-body2 text-primary'>{data.desc}</p>
                    <div className="flex justify-center md:justify-start">
                        <button onClick={handleEdit} className='flex items-center justify-center border border-primary50 w-[114px] py-2'>
                            <MdOutlineEdit className='text-primary50 mr-2 w-[24px] h-[24px]' /> 
                            <span className='text-primary50 font-sans text-body2'>Edit</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
