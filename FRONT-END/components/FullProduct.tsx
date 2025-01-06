/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect } from 'react'
import z from 'zod'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'

import { productSchema } from '@/schemas/productSchema'
import { useCartStore } from '@/Store/useCartStore'
import { useUserStore } from '@/Store/useUserStore'
import AddToCartMustLogin from './AddToCartMustLogin'
const FullProduct = ({ product }: { product: z.infer<typeof productSchema> }) => {
    const { AddProductToCart, Pending } = useCartStore();
    const { user, checkAuth } = useUserStore();

    useEffect(() => {
        checkAuth(false)
    }, []);
    console.log("adad", user)

    return (
        <section className="flex flex-col justify-center items-center">
            {/*Header Section*/}
            <div className="relative flex flex-col w-full">
                <div className='relative'>
                    <img alt="banner" className='w-full h-[500px]' src={typeof product.image === 'string' ? product.image : undefined} />
                    <div className='absolute inset-0 bg-black bg-opacity-50' />
                </div>


                <div className="absolute inset-0 flex flex-col flex-grow justify-center items-center mx-auto max-w-7xl h-[500px]">
                    <div className="flex justify-center items-center font-sans">
                        <h1 className='shadow font-semibold text-5xl text-white'>Products Details</h1>
                    </div>
                    <h2 className='mt-12 font-medium text-3xl text-white'>Home / Product Details</h2>
                </div>
                {/*product floating*/}
                <div className='flex justify-center -translate-y-24'>
                    <div className='flex flex-col bg-white opacity-90 shadow-lg px-20 py-6 rounded-medium'>
                        <div className='flex justify-center items-center mt-2'>
                            {Array.from({ length: 5 }, (_, index) => <Icon key={index} className={`${product.rating > index && " opacity-100 text-default"}`} height="24" icon="stash:star-solid" width="24" />
                            )}
                            {/*Product Name*/}
                        </div>
                        <h3 className='opacity-100 mt-4 font-bold text-black text-center text-xl'>{product.name}</h3>

                        <div className='flex justify-center gap-x-4 my-4'>
                            <p className='text-gray-500 text-lg line-through'>${product.price}</p> {/* Add line-through class */}
                            <p className='font-bold text-black text-lg'>${product.price - (product.price * (product.discount / 100))}</p>
                        </div>
                        {Boolean(user) ?
                            <Button disabled={Pending} isLoading={Pending} radius='sm' variant='bordered' onPress={() => product.id && AddProductToCart(product.id)}>ADD TO BASKET</Button>
                            :
                            <AddToCartMustLogin />
                        }
                    </div>
                </div>

            </div>

            <div className="flex mt-4">
                <div className="flex lg:flex-row flex-col justify-between items-center gap-12 bg-white py-12">
                    {/* Images Section */}
                    <div className="relative flex lg:flex-row flex-col items-center gap-8">
                        {/* First Image */}
                        <div className="shadow-lg rounded-lg overflow-hidden">
                            {/* <Image
                            alt={product.name}
                            className="w-full h-full object-cover"
                            height={400}
                            src={product.image}
                            width={300}
                        /> */}
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="max-w-lg lg:text-left">
                        <h1 className="mb-4 font-bold text-3xl text-center text-gray-800 lg:text-4xl">
                            {product.name}
                        </h1>
                        <p className="mb-6 text-center text-gray-600">
                            {product.description}
                        </p>

                    </div>
                </div>
            </div>



        </section>
    )
}

export default FullProduct