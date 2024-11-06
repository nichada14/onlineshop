import React from 'react';
import Logo from '@/public/images/logo2.png';
import Image from 'next/image';
import Link from 'next/link';

const Navbar: React.FC<{ isEditOrCreate: boolean }> = ({ isEditOrCreate }) => {
  return (
    <nav className={`w-full h-[64px] p-2 flex items-center justify-center ${isEditOrCreate ? 'bg-black' : 'bg-white'} shadow-[0px_4px_8px_#0000001F]`}>
      <Link href="/">
        <Image src={Logo} alt="Logo" className="h-full" />
      </Link>   
    </nav>
  );
};

export default Navbar;
