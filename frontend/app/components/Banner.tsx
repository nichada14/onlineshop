// components/Banner.tsx
import React from 'react';
import Image from 'next/image';
import bannerImage from '@/public/images/banner.png';

const Banner: React.FC = () => {
  return (
    <div className="">
      <Image 
        src={bannerImage} 
        alt="Banner Image" 
        layout="responsive"
        className="object-cover h-[431px] w-full" 
      />
    </div>
  );
}

export default Banner;
