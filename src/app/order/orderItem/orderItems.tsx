import Image from 'next/image'
import React from 'react'

const OrderItems = ({CartsItemsOrder, onRemoveOrders}: any) => {
  return (
    <div>
        <div className='ml-20'>
        {CartsItemsOrder.length > 0 ? (
                    CartsItemsOrder.map((item: any, index: number) => (
                      <div key={index} className="p-4 my-4 border rounded">
                        <Image src={process.env.NEXT_PUBLIC_API_BASE_URL+item.image} alt="item vart" width={140} height={140} priority unoptimized={true}/>
                        <h2 className="text-lg font-semibold">{item?.nameproduct}</h2>
                        <span className="text-sm font-semibold">quantity: {item?.quantity}</span>
                        <p className="text-sm font-semibold">Price: ${item?.amount}</p>   <button onClick={() => onRemoveOrders(item.id)} className="bg-red-700 cursor-pointer ml-56 text-center text-xs rounded-lg items-center p-3 font-bold text-white">X</button>
                      </div>
                    ))
                  ) : (
                    <p>Your cart is empty</p>
                  )}
        </div>
    </div>
  )
}

export default OrderItems