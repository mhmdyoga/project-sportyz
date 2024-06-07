"use client"
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import CustomButton from './CustomButton'
import BaseApi from '@/utils/libs/BaseApi'
import Image from 'next/image'
import axios from 'axios'
import { useAuth } from './context/AuthContext'
import CartsItems from './CartsItems'
import { useToast } from './ui/use-toast'
  

const CartProduct = () => {
  const { user, cartLength, setCartLength } = useAuth()
  const [CartItems, setCartItems] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    getItemLength();
    // DataCartItems();
  }, [user, setCartLength]);
  const getItemLength = async () => {
    try { 
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token') || ''; 
      
      if (!user || !user.id) {
        console.error('User ID not found');
        return;
      }
      
      const response = await axios.get(`http://localhost:1337/api/carts`, {
        params: {
          'filters[userId][$eq]': user.id,
          'populate[products][populate][image][populate][0]': 'url'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const DataCart = response.data.data;
            const CartMap: any = DataCart.map((item: any)=> ({
              id: item?.id,
              nameproduct: item?.attributes?.nameproduct,
              quantity: item?.attributes?.quantity,
              amount: item?.attributes?.amount,
              image: item?.attributes?.products?.data[0].attributes?.image?.data[0].attributes?.url
            }));
            console.log('DATA Berhasil DI map',CartMap);
            setCartItems(CartMap);       

      if (response.status === 200) {
        const items = response.data;
        setCartLength(items?.meta?.pagination?.total || 0);
      } else {
        console.error('Error fetching items:', response);
      }
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // remove item
  const removeItems =async (itemId: number) => {
    try {
      const token = localStorage.getItem('token') || '';
      await axios.delete(`http://localhost:1337/api/carts/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res=> {
        toast({ variant: 'destructive', title: 'Item Removed'})
      });
      getItemLength()
    } catch (error) {
      console.log('error removed item:', error)
    }
  };
  // p

  return (
    <div>
        <Sheet>
          <SheetTrigger>
            <div className='flex flex-row gap-2 items-center justify-center cursor-pointer'>
                <Image src="/icon _shopping bag.png" width={30} height={30} alt="cart" />
                <span className="text-white font-bold">{cartLength}</span>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>
                Happy Shopping !!!
              </SheetDescription>
            </SheetHeader>
            <div className='flex flex-col gap-4 p-4'>
            <CartsItems CartItems={CartItems} onRemove={removeItems}/>
            </div>
          </SheetContent>
        </Sheet>
    </div>
  )
}

export default CartProduct