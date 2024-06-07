"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CartsItems = ({CartItems, onRemove}: any) => {
  const [subtotal, setSubTotal] = useState(0);
  const router = useRouter()

  useEffect(() => {
    let total = 0;
    CartItems.forEach((element: any)=> {
      total= total+element.amount
    });
    setSubTotal(total)
  }, [CartItems])


  
  
  
  return (
    <div>
        <div className="">
            {CartItems.length > 0 ? (
                    CartItems.map((item: any, index: number) => (
                      <div key={index} className="p-4 my-4 border rounded">
                        <Image src={process.env.NEXT_PUBLIC_API_BASE_URL+item.image} alt="item vart" width={70} height={70} priority unoptimized={true}/>
                        <h2 className="text-lg font-semibold">{item?.nameproduct}</h2>
                        <span className="text-sm font-semibold">quantity: {item?.quantity}</span>
                        <p className="text-sm font-semibold">Price: ${item?.amount}</p>   <button onClick={() => onRemove(item.id)} className="bg-red-700 cursor-pointer ml-56 text-center text-xs rounded-lg items-center p-3 font-bold text-white">X</button>
                      </div>
                    ))
                  ) : (
                    <p>Your cart is empty</p>
                  )}
        </div>
        <div className="">
        <span className='font-bold text-lg'>Subtotal: ${subtotal.toFixed(2)}</span>
        <button disabled={CartItems.length === 0} onClick={() => router.push('/order')} className={`${CartItems.length === 0 ? 'bg-gray-600 text-gray-400' : 'bg-emerald-600 text-white'} font-bold w-full rounded-md flex p-3 justify-center items-center`}>
          <h2 className="text-center italic">Order</h2>
        </button>
        </div>
    </div>
  )
}

export default CartsItems