"use client"
import BaseApi from '@/utils/libs/BaseApi';
import React, { useEffect, useState } from 'react';
import RecomendItem from './RecomendItem';

const ProductList = ({ titles, img, style }: CustomButtonProps) => {
  const [getProducts, setGetProducts] = useState<any[]>([]);
//  get data prodcts
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    BaseApi.getAllProducts().then((res) => {
      setGetProducts(res.data.data);
    });
  };

  return (
    <div>
      <h2 className="text-emerald-600 p-16">Recommended Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-14 gap-8 md:ml-32 md:p-8 ml-12 p-3">
        {getProducts.map((product: any, index: number) => (
         <RecomendItem key={index} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default ProductList