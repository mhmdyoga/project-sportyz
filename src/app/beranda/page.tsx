"use client"
import CustomButton from '@/components/CustomButton';
import React from 'react';
import { useRouter } from 'next/navigation'
import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';


const Beranda = () => {
  const router = useRouter();
  return (
    <>
    <div className='w-full h-screen bg-bg-hero-banner bg-cover bg-center bg-no-repeat top-0 absolute p-0 m-0'>
      {/* hero banner */}
        <div className='p-12 flex flex-col gap-4 mt-40'>
            <h2 className='md:text-5xl text-4xl md:text-start font-extrabold text-white'>Style Make Your Live, and <br/> Shoe Give Your Soul.</h2>
            <CustomButton titles='Explore Shop' img='/arrow right.png' style="bg-white flex flex-row justify-center items-center gap-2 rounded-full text-[#007153] md:text-lg text-sm font-bold md:w-40 md:h-12 w-34 h-12" Click={() => router.push('/shop')}/>
        </div>
    </div>
     <div className="absolute flex flex-col gap-4 mt-[650px]">
      {/* Category List */}
      <CategoryList  />
      {/* productsList */}
      <ProductList />
    </div>
    </>
  )
}

export default Beranda