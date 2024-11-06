"use client";

import React, { useState } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchBox: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); 
  };

  return (
    <div className="flex items-center gap-[16px] opacity-100">
      <span className="">Search</span>
      <input 
        type="text" 
        value={query}
        onChange={handleChange}
        className="w-[300px] h-[40px] border border-gray-300 px-4"
      />
    </div>
  );
};

export default SearchBox;
