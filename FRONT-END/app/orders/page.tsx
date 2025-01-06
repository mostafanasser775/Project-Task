'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import axiosInstance from '@/lib/axios'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        axiosInstance.get('/orders').then((res) => {
            setOrders(res.data)
            console.log(res.data)
        })

    }, [])

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const calculateTotalPrice = (items: any[]) => {
        return items.reduce((total, item) => {
            const discountedPrice = item.price - (item.price * (item.product.discount / 100));
            return total + (discountedPrice * item.quantity);
        }, 0).toFixed(2);
    };

    return (<>
        <section className="flex flex-col flex-1 justify-center items-center mx-auto py-8 md:py-16 antialiased container">
            <h2 className="w-full font-semibold text-gray-900 text-start text-xl sm:text-2xl dark:text-white">My orders</h2>
            <hr className='my-4' />
            {
                orders.map((order: any) => (
                    <div key={String(order.id)} className="my-2 px-4 border rounded-large divide-y divide-gray-200 dark:divide-gray-700 w-full">
                        <div className="flex flex-wrap justify-between items-center gap-y-4 py-6 w-full">
                            <dl className="lg:flex-1 w-1/2 sm:w-1/4 lg:w-auto">
                                <dt className="font-medium text-base text-gray-500 dark:text-gray-400">Order ID:</dt>
                                <dd className="mt-1.5 font-semibold text-base text-gray-900 dark:text-white">
                                    <span >{order?.id}</span>
                                </dd>
                            </dl>

                            <dl className="lg:flex-1 w-1/2 sm:w-1/4 lg:w-auto">
                                <dt className="font-medium text-base text-gray-500 dark:text-gray-400">Date:</dt>
                                <dd className="mt-1.5 font-semibold text-base text-gray-900 dark:text-white">{formatDate(order.createdAt)}</dd>
                            </dl>

                            <dl className="lg:flex-1 w-1/2 sm:w-1/4 lg:w-auto">
                                <dt className="font-medium text-base text-gray-500 dark:text-gray-400">Total Price:</dt>
                                <dd className="mt-1.5 font-semibold text-base text-gray-900 dark:text-white">
                                    ${calculateTotalPrice(order.items)}
                                </dd>
                            </dl>

                            <dl className="lg:flex-1 w-1/2 sm:w-1/4 lg:w-auto">
                                <dt className="font-medium text-base text-gray-500 dark:text-gray-400">Status:</dt>
                                <dd className="inline-flex items-center bg-primary-100 dark:bg-primary-900 mt-1.5 px-2.5 py-0.5 rounded font-medium text-primary-800 text-xs dark:text-primary-300 me-2">
                                    Pending
                                </dd>
                            </dl>

                            <div className="lg:flex lg:justify-end lg:items-center gap-4 grid sm:grid-cols-2 w-full lg:w-64">
                                <button type="button" className="hover:bg-red-700 dark:hover:bg-red-600 px-3 py-2 border border-red-700 dark:border-red-500 rounded-lg focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900 w-full lg:w-auto font-medium text-center text-red-700 text-sm hover:text-white dark:hover:text-white dark:text-red-500 focus:outline-none">Cancel order</button>
                                <span className="inline-flex focus:z-10 justify-center border-gray-200 dark:border-gray-600 bg-white hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-800 px-3 py-2 border rounded-lg focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 w-full lg:w-auto font-medium text-gray-900 text-sm hover:text-primary-700 dark:hover:text-white dark:text-gray-400 focus:outline-none">View details</span>
                            </div>
                        </div>
                    </div>
                ))

            }
        </section>

    </>)
}

