"use client"
import FetchByCategory from '@/components/FetchByCategory';
import axios from 'axios';
import React, { useState, useEffect } from 'react';


const CategoryByBrand = ({ params: { name } }: any) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedName = decodeURI(name);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products?filters[Brands][name][$in]=${decodedName}&populate=*`
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [name]);

  return (
    <div>
      <h2 className="text-emerald-600 font-bold p-28">
        Recommended Products By:{" "}
        <span className="font-bold text-black">{decodeURI(name)}</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-20 mt-[-80px] gap-8">
        {data.map((product, index) => (
          <FetchByCategory key={index} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default CategoryByBrand;