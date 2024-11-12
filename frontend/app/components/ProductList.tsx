"use client";

import React, { useEffect, useState } from 'react';
import SearchBox from './SearchBox';
import Dropdown from './Dropdown';
import Card from './Card';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
}

const ProductList = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState("Price: High - Low");
  const sortOptions = ["Price: High - Low", "Price: Low - High"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/onlineshop/api/products");
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const results = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedQuery) ||
      String(product.price).includes(lowercasedQuery)
    );
    setFilteredProducts(results);
  };

  const handleSortChange = (value: string) => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return value === "Price: High - Low" ? b.price - a.price : a.price - b.price;
    });
    setFilteredProducts(sortedProducts);
    setSortOption(value);
  };

  const handleCardClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  const displayProducts = filteredProducts.length > 0 ? filteredProducts : products;

  return (
    <div> 
      <p className='text-center text-heading3 md:text-heading2'>NEW ARRIVALS</p>
      <div className='mt-6 flex flex-col sm:flex-row items-center justify-between'> 
        <div className="hidden md:block">
          <SearchBox onSearch={handleSearch} />
        </div>
        <div className='flex items-center justify-center mt-4 sm:mt-0 lg:justify-end w-full'> 
          <span className='mr-2'>Sort by</span>
          <Dropdown 
            options={sortOptions} 
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {displayProducts.map(product => (
          <Card 
            key={product.id} 
            image={product.image} 
            title={product.name} 
            price={product.price.toString()} 
            onClick={() => handleCardClick(product.id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
