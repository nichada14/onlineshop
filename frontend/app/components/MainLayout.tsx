'use client'; 

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';


const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isEditOrCreate = pathname === '/create-product' || pathname.startsWith('/edit-product/');

  return (
    <>
      <Navbar isEditOrCreate={isEditOrCreate} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
