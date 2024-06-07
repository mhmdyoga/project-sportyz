"use client"
import FetchProductShop from '@/components/fetchProductShop';
import BaseApi from '@/utils/libs/BaseApi'
import React, { useEffect, useState } from 'react'


const Shop = ()=> {
    const [dataProduct, setDataProduct] = useState([]);
    useEffect(() => {
        dataShop();
    }, [])
    const dataShop = () => {
        BaseApi.getProduct().then(res => {
            setDataProduct(res.data.data);
        })
    }
  return (
    <div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 p-20 gap-8'>
        {dataProduct.map((product: any, index: number) => (
            <FetchProductShop key={index} product={product}/>
        ))}
        </div>
    </div>
  )
}

export default Shop