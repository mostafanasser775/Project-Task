'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
//import { Plus, Minus, Heart, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/Store/useUserStore'
import { useCartStore } from '@/Store/useCartStore'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'

export default function CartPage() {
    const router = useRouter()

    const { Cart, getCart, Total,AddProductToCart,DecrementProductCart } = useCartStore()
    const { user } = useUserStore()

    useEffect(() => {
        if (Cart.length < 1) getCart();
    }, [])

    return (
        <section className="bg-gray-50 dark:bg-gray-900 py-8 md:py-16 antialiased">
            <div className="mx-auto px-4 2xl:px-0 max-w-screen-xl">
                <h2 className="font-semibold text-gray-900 text-xl sm:text-2xl dark:text-white">Shopping Cart</h2>

                <div className="lg:flex lg:items-start md:gap-6 xl:gap-8 mt-6 sm:mt-8">
                    <div className="flex-none mx-auto w-full lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6">

                            {Cart.map((cart) => (
                                <div key={cart.id} className="border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-4 md:p-6 border rounded-lg">
                                    <div className="md:flex md:justify-between md:items-center md:gap-6 space-y-4 md:space-y-0">
                                        <Link href={`/product-details/${cart?.product?.documentId}`} className="md:order-1 shrink-0">
                                            <Image alt='cart image' className='w-20 h-20' height={80} src={cart?.product?.image} width={80} />
                                        </Link>

                                        <label className="sr-only" htmlFor="counter-input">Choose quantity:</label>
                                        <div className="flex justify-between md:justify-end items-center md:order-3">
                                            <div className="flex items-center">
                                                <Button isIconOnly variant={'bordered'} onPress={()=>DecrementProductCart(cart.productId)}>
                                                    <Icon className='font-bold' height="16" icon="lucide:minus" width="16" />
                                                </Button>
                                                <span className='bg-transparent focus:ring-0 w-10 font-medium text-center text-gray-900 text-sm dark:text-white focus:outline-none shrink-0'>{cart.quantity}</span>
                                                <Button isIconOnly variant={'bordered'} onPress={()=>AddProductToCart(cart.productId)}>
                                                    <Icon className='font-bold' height="16" icon="lucide:plus" width="16" />
                                                </Button>
                                            </div>
                                            <div className="md:order-4 md:w-32 text-end">
                                                <p className="font-bold text-base text-gray-900 dark:text-white">${cart?.product?.price - (cart?.product?.price * (cart?.product?.discount / 100))}</p>
                                            </div>
                                        </div>

                                        <div className="flex-1 space-y-4 md:order-2 w-full min-w-0 md:max-w-md">
                                             <span  className="px-3 font-medium text-base text-gray-900 dark:text-white hover:underline">{cart?.product?.name}</span> 

                                            <div className="flex items-center gap-4">
                                                 <Button variant="light"><Icon className='text-red-600' icon="lucide:heart" width="20" height="20" />Add to Favorites</Button> 
                                                 {/* <Button className='text-red-600 hover:text-red-600' variant="ghost" onClick={() => deleteCart(item?.documentId)}><X width={20} height={20} />Remove</Button>  */}

                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}



                        </div>

                    </div>

                    <div className="flex-1 space-y-6 mx-auto mt-6 lg:mt-0 lg:w-full max-w-4xl">
                        <div className="space-y-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-4 sm:p-6 border rounded-lg">
                            <p className="font-semibold text-gray-900 text-xl dark:text-white">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    {/* <dl className="flex justify-between items-center gap-4">
                      <dt className="font-normal text-base text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="font-medium text-base text-gray-900 dark:text-white">$7,592.00</dd>
                    </dl> */}

                                    {/* <dl className="flex justify-between items-center gap-4">
                      <dt className="font-normal text-base text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="font-medium text-base text-green-600">-$299.00</dd>
                    </dl>

                    <dl className="flex justify-between items-center gap-4">
                      <dt className="font-normal text-base text-gray-500 dark:text-gray-400">Store Pickup</dt>
                      <dd className="font-medium text-base text-gray-900 dark:text-white">$99</dd>
                    </dl>

                    <dl className="flex justify-between items-center gap-4">
                      <dt className="font-normal text-base text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="font-medium text-base text-gray-900 dark:text-white">$799</dd>
                    </dl> */}
                                </div>

                                <dl className="flex justify-between items-center gap-4 border-gray-200 dark:border-gray-700 pt-2 border-t">
                                    <dt className="font-bold text-base text-gray-900 dark:text-white">Total</dt>
                                    <dd className="font-bold text-base text-gray-900 dark:text-white">${Math.round(Total)}</dd>
                                </dl>
                            </div>
                            <Button className='mt-4 py-5 w-full' onClick={() => router.push(`/checkout?amount=${Math.round(Total)}`)} >
                                Proceed to Checkout
                            </Button>

                            <div className="flex flex-col justify-center items-center gap-2">

                                <span className="font-normal text-gray-500 text-sm"> or </span>
                                <Link href="/" className="font-medium text-primary-700 text-sm underline hover:no-underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>


                        <div className="space-y-4 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm p-4 sm:p-6 border rounded-lg">
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="voucher" className="block mb-2 font-medium text-gray-900 text-sm dark:text-white"> Do you have a voucher or gift card? </label>
                                    <input type="text" id="voucher" className="block border-gray-300 focus:border-primary-500 dark:focus:border-primary-500 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5 border rounded-lg focus:ring-primary-500 dark:focus:ring-primary-500 w-full text-gray-900 text-sm dark:text-white dark:placeholder:text-gray-400" placeholder="" required />
                                </div>
                                <button type="submit" className="flex justify-center items-center bg-blue-700 hover:bg-primary-800 dark:hover:bg-primary-700 dark:bg-primary-600 px-5 py-2.5 rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 w-full font-medium text-sm text-white focus:outline-none">Apply Code</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}


