'use client'
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

import { useUserStore } from '@/Store/useUserStore'
import { useCartStore } from '@/Store/useCartStore'

export default function ShoppingCartItem() {
    const router = useRouter()
    const { Cart, getCart, Total } = useCartStore()
    const { user } = useUserStore()

    useEffect(() => {
        if (Cart.length < 1) getCart();
    }, [getCart])

    return (
        <>
            <div className='flex items-center gap-1 cursor-pointer'>
                <Popover placement='bottom' radius='sm'>

                    <PopoverTrigger asChild>
                        <Button  variant="light" className='dark:text-white'><Icon height="24" icon="lucide:shopping-cart" width="24" />
                            <span>{Cart.length < 1 ? (0) : Cart.length}</span></Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <div className='flex flex-col p-4 w-80 max-h-[500px] overflow-y-auto miniSlideBar'>
                            <span className="mt-2 font-bold text-center leading-none">Your Proudcts</span>

                            <hr className='my-3' />

                            <div className='flex flex-col gap-y-4 px-4 w-full'>
                                {Cart.map((item) =>
                                (<div key={item.id} >
                                    <div className="flex justify-between items-center rounded-md w-full">
                                        <Image alt="product Banner" height={72} src={item?.product?.image} width={72} />

                                        <div>
                                            <h3 className="line-clamp-1 text-gray-900 text-sm">{item?.product?.name}</h3>

                                            <dl className="space-y-px mt-0.5 text-[10px] text-gray-500">
                                                <div>
                                                    <dt className="inline">CATEGORY : </dt>
                                                    <dd className="inline">{item?.product?.category}</dd>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <div>
                                                        <dt className="inline">PRICE : </dt>
                                                        <dd className="inline">${item?.product?.price - (item?.product?.price * (item?.product?.discount / 100))}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="inline">Q : </dt>
                                                        <dd className="inline">{item?.quantity}</dd>
                                                    </div>
                                                </div>
                                            </dl>
                                        </div>

                                        <div className="flexjustify- items-endcenter max-w-6">
                                            <button className="text-gray-600 hover:text-red-600 transition">
                                                <Icon height="24" icon="proicons:delete" width="24" />                                        </button>
                                        </div>

                                    </div>

                                </div>
                                ))}
                            </div>


                            <div className="flex flex-col space-y-4 my-4 w-full text-center">
                                <Link className="block border-gray-600 px-5 py-3 border rounded hover:ring-1 hover:ring-gray-400 text-gray-600 text-sm transition" href="/cart">
                                    View my cart ({Cart.length})
                                </Link>

                                <Button className='py-6' onPress={() => router.push(`/checkout?amount=${Math.round(Total)}`)}>Checkout</Button>


                                <Link className="inline-block my-4 text-gray-500 text-sm hover:text-gray-600 underline underline-offset-4 transition" href="/products">
                                    Continue shopping
                                </Link>
                            </div>
                        </div>
                    </PopoverContent >
                </Popover>




            </div>

        </>
    )
}
