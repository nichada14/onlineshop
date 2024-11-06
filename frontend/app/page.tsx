import React from 'react'
import Banner from './components/Banner';
import ProductList from './components/ProductList';


const Home = () => {
  return (
    <div className='mx-auto w-[343px] lg:w-[984px] pb-[12px]  md:pb-[100px]'>
      <div className="relative pt-[16px] md:pt-[32px]">
        <Banner />
      </div>
      <div className='mt-[16px] md:mt-[56px]'>
        <ProductList />
      </div>
    </div>
  )
}

export default Home;