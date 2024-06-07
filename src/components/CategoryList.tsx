"use client"
import BaseApi from '@/utils/libs/BaseApi'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const CategoryList = () => {
    const [categoryList, setCategoryList] = useState([]);
    useEffect(() => {
        getCategoryList();
    }, []);
    const getCategoryList = () => {
            BaseApi.getCategory().then((res) => {
                setCategoryList(res.data.data);
            });
        }
  return (
    <div>
        <h2 className="text-center ml-11 md:p-6 p-2 md:text-start text-emerald-600 font-extrabold">Shop By Category Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-14 gap-8 md:ml-32 md:p-8 ml-12 p-3">
            {categoryList.map((category: any, index: number)=> (
                <Link href={`/brands/${category?.attributes?.name}`} key={index} className="flex flex-col bg-slate-200 text-center items-center p-4 rounded-2xl gap-2">
                    <Image src={`/${category?.attributes?.image?.data?.attributes?.name}`} alt="" width={70} height={70} priority/>
                    <h2>{category?.attributes?.name}</h2>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default CategoryList