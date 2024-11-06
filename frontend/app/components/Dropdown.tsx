import React, { useState } from 'react';
import { IoChevronDownSharp } from 'react-icons/io5';

interface DropdownProps {
    options: string[];
    selectedOption: string;
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (value: string) => {
        onSelect(value);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button 
                className='flex justify-between items-center w-[180px] h-[40px] px-4 py-2 bg-white border border-gray-300 shadow-sm text-sm font-medium text-gray-700'
                onClick={() => setIsOpen(prev => !prev)}
            >
                {selectedOption}
                <IoChevronDownSharp 
                    className={`ml-2 transition-transform ${isOpen ? "rotate-180" : ""}`} 
                    size={20}
                />
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                        {options.map(option => (
                            <button 
                                key={option}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => handleSelect(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
