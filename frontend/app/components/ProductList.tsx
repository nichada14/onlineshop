"use client";

import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import Dropdown from './Dropdown';
import Card from './Card';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface DataProps {
  id: number;
  image: string;
  name: string;
  price: number;
}

const ProductList = () => {
  const router = useRouter();
  const [data, setData] = useState<DataProps[]>([]);
  const [filteredData, setFilteredData] = useState<DataProps[]>([]);
  const [sortData, setSortData] = useState<DataProps[]>([]);
  const [sortOption, setSortOption] = useState("Price: High - Low");
  const options = ["Price: High - Low", "Price: Low - High"];

  const displayData = filteredData.length > 0 ? filteredData : sortData;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/onlineshop/api/products");
        console.log(res.data);
        setData(res.data);
        setFilteredData(res.data);
        setSortData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const results = data.filter(item => 
      item.name.toLowerCase().includes(lowercasedQuery) || 
      String(item.price).includes(lowercasedQuery)
    );
    setFilteredData(results);
  };

  const handleSortChange = (value: string) => {
    const dataToSort = [...(filteredData.length > 0 ? filteredData : sortData)];

    if (value === "Price: High - Low") {
        dataToSort.sort((a, b) => b.price - a.price);
    } else if (value === "Price: Low - High") {
        dataToSort.sort((a, b) => a.price - b.price);
    }

    setFilteredData(dataToSort);
    setSortData(dataToSort);
    setSortOption(value);
};

  const handleCardClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div> 
        <p className='text-center text-heading3 md:text-heading2'>NEW ARRIVALS</p>
      <div className='mt-6 flex flex-col sm:flex-row items-center justify-between'> 

        {/* search section */}
        <div className="hidden md:block">
          <SearchBox onSearch={handleSearch} />
        </div>
        

        {/* sort by section */}
        <div className='flex items-center justify-center mt-4 sm:mt-0 lg:justify-end w-full'> 
          <span className='mr-2'>Sort by</span>
            <Dropdown 
                options={options} 
                selectedOption={sortOption} 
                onSelect={handleSortChange} 
            />
        </div>
      </div>

      <div className='flex justify-center mt-4 w-full'>
        <div className='flex justify-center lg:justify-end w-full'>
          <Link href="/create-product">
            <button className='border border-primary60 rounded-sm px-4 py-2 text-title2 hover:bg-primary50 text-primary50 hover:text-white hover:border-white'>
              Create Product
            </button>
          </Link>
        </div>
      </div>

      {/* card section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {displayData.map(item => (
          <div key={item.id}>
            <Card 
              image={item.image} 
              title={item.name} 
              price={item.price.toString()}
              onClick={() => handleCardClick(item.id)}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductList;
