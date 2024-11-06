import Image from 'next/image';
import React from 'react';

interface CardProps {
    image: string;
    title: string;
    price: string;
    onClick: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, onClick, price }) => {
    const imageSrc = image.startsWith('http') ? image : `/${image}`;
    const formattedPrice = parseFloat(price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
    return (
      <div className='w-[163.5px] lg:w-[234px] h-[287px] lg:h-[356px] border border-gray-300 overflow-hidden shadow-lg cursor-pointer mr-2' onClick={onClick}>
        <div className="relative h-[165px] lg:h-[234px]">
          <Image 
            src={imageSrc}
            alt={title} 
            className='object-cover'
            layout="fill" 
          />
        </div>
        <div className="h-[122px] px-4 py-2 mt-4">
          <h2 className="text-primary text-title2">{title}</h2>
          <p className="text-primary text-title1 mt-2">${formattedPrice}</p>
        </div>
      </div>
    );
}

export default Card;
