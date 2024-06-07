"use client"
import CartsItems from '@/components/CartsItems'
import { useAuth } from '@/components/context/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import React, { useEffect, useState } from 'react'
import OrderItems from './orderItem/orderItems'
import axios from 'axios'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

const Order = () => {
    const { user, cartLength, setCartLength } = useAuth();
  const [CartItems, setCartItems] = useState<{ amount: number }[]>([]);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [numPhone, setNumPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const { toast }: any = useToast();
    
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
      }).then(res => {
        toast({ variant: 'destructive', title: 'Item Removed'})
      });
      getItemLength()
    } catch (error) {
      console.log('error removed item:', error)
    }
  };

  // post data user 
 


  return (
    <div>
        <div className='p-24'>
            <h2 className='font-bold text-xl'>Order Billing</h2>
            <div className='w-full flex flex-col md:flex-row mt-5 h-96 rounded-xl'>
                <h2 className='text-xl font-bold p-3'>Your Items</h2>
            <div className='mt-6 flex flex-col h-40 gap-2 p-6 ml-[-210px]'>
           <OrderItems CartsItemsOrder={CartItems} onRemoveOrders={removeItems}/>
            </div>
                <div className='p-4  ml-60 '>
                    <div className='bg-slate-300 rounded-xl p-6  h-80'>
                        <h2 className='text-center font-bold p-2'>Total Order</h2>
                        <h2>Total Order: <span className='ml-20'>{`(${cartLength})`}</span></h2>
                        <h2>amount: <span className='ml-24'>${CartItems.reduce((total, item) => total + item.amount, 0).toFixed(2)}</span></h2>
                        <h2>Delivery:<span className="ml-24">$15.00</span></h2>
                        <h2>{`Tax(9%):`}</h2>
                        <h2>Total:   <span className="ml-28">${CartItems.reduce((total, item) => total + item.amount+15*0.9, 0).toFixed(2)}</span></h2>
                        <AlertDialog>
                                <AlertDialogTrigger>
                                <span className='p-3 flex justify-center items-center mt-3 w-full rounded-md bg-emerald-600 font-bold text-white'>
                                    <h2 className="">Pay Now</h2>
                                 </span>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Confrim Yourself</AlertDialogTitle>
                                    <form>
                                    <AlertDialogDescription className="grid grid-cols-1 md:grid-cols-2 gap-2 p-3 border outline-none">
                                        <input type="text" value={userName}  onChange={(e) => setUserName(e.target.value)} placeholder='username' className="p-3 border outline-none w-full h-auto"/>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder='email' className="p-3 border outline-none w-full h-auto"/>
                                        <input type='text' value={numPhone} onChange={(e) => setNumPhone(e.target.value)} placeholder='phone' className="p-3 border outline-none w-full h-auto"/>
                                        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder='Zip Code' className="p-3 border outline-none w-full h-auto"/>
                                        <div>
                                          <input type="text" value={address}  onChange={(e) => setAddress(e.target.value)} placeholder='address' className="p-3 border outline-none w-full h-auto"/>
                                        </div>
                                    </AlertDialogDescription>
                                    <div className='p-3'>
                                      <button className='bg-emerald-600 p-3 text-white font-bold rounded-lg'>Continue</button>
                                    </div>
                                    </form>
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
    </div>
  )
}

export default Order