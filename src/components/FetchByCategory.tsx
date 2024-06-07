"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
import CustomButton from './CustomButton';
import { useToast } from './ui/use-toast';
import BaseApi from '@/utils/libs/BaseApi';

const FetchByCategory = ({product}: any) => {
    const [quantity, setQuantity] = useState(1)
    const {toast} = useToast()
    // add to cart
    const addToCart = () => {
        const token = localStorage.getItem("token")
        if(!token){
          toast({ variant: "destructive", title: "Please Login" })
          window.location.href = '/auth/login'
        } else {
          const user = JSON.parse(localStorage.getItem("user") || "{}")
            const data = {
            data: {
            quantity: quantity,
            nameproduct: product?.attributes?.nameproduct || '',
            products: product?.id || '',
            amount: (quantity*(product?.attributes?.price || 0)).toFixed(2),
            users_permissions_users: user.id || '',
            userId: user.id || '' 
            }
          };
          BaseApi.postCart(data, token).then((res: any) => {
            console.log(res);
            toast({
              title: "Add to cart success",
              description: "HAPPY SHOPPING!!!",
            });
          });
        }
      };
  return (
    <div>
        <div className="bg-gray-400 rounded-2xl p-4">
            <Image src={process.env.NEXT_PUBLIC_API_BASE_URL+product?.attributes?.image?.data[0].attributes?.url} alt="img" width={300} height={300} unoptimized={true} priority />
            <div className='flex flex-col gap-2 font-bold'>
              <h1 className="font-bold">{product?.attributes?.nameproduct}</h1>
              <span>${product?.attributes?.price}</span>
              <div className="justify-center items-center">
              <AlertDialog>
                <AlertDialogTrigger>
                  <CustomButton
                    titles="Checkout"
                    img="/icon _shopping bag.png"
                    style="flex flex-row gap-2 p-2 items-center text-white bg-black rounded-xl"
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogDescription>
                      <div className="flex flex-col md:flex-row gap-3">
                        <Image
                          alt="image"
                          src={process.env.NEXT_PUBLIC_API_BASE_URL +
                            product?.attributes?.image?.data[0]
                              .attributes?.url}
                          width={400}
                          height={400}
                          unoptimized={true}
                        />
                        <div className="flex flex-col gap-2">
                          <h2 className="text-2xl font-bold">{product?.attributes?.nameproduct}</h2>
                          <h2 className="text-xl font-bold">${product?.attributes?.price}</h2>
                          <h2 className="text-sm font-medium">{product?.attributes?.description}</h2>
                          <div className="flex flex-row gap-3">
                            <button disabled={quantity==1} className="font-medium" onClick={() => setQuantity(quantity-1)}>-</button>
                            <span className="font-bold text-black">{quantity}</span>
                            <button className="font-medium" onClick={() => setQuantity(quantity+1)}>+</button>
                            <div>
                              <span>=</span> <span className="font-bold text-black">${(quantity*product?.attributes?.price).toFixed(2)}</span>
                            </div>
                          </div>
                          <h2 className="font-bold text-black"><span className="font-medium">Brand:</span> {product?.attributes?.Brands?.data[0].attributes.name}</h2>
                          <button className="text-white font-bold bg-emerald-600 rounded-md p-3" onClick={addToCart}>Add To Cart</button>
                        </div>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction>X</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </div>
            </div>
          </div>
    </div>
  )
}

export default FetchByCategory