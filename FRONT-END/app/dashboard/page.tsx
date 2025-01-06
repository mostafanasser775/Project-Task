import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/button'
import { Spinner } from '@nextui-org/spinner'

export default function Dashboard() {
    const data = { products: 120, orders: 45, revenue: 15000 };

    return (
        <div className='flex flex-col flex-grow mx-auto px-4 max-w-7xl'>
            <header className="py-8">
                <h1 className="font-bold text-4xl">Welcome, Supplier!</h1>
                <p className="mt-2 text-gray-600 text-lg">Here you can manage your orders, products, and settings.</p>
            </header>
            <main className="flex-1">
                <section className="mt-8">
                    <h2 className="font-semibold text-2xl">Overview</h2>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
                        <div className="bg-white shadow hover:shadow-lg p-4 rounded-lg transition duration-300 ease-in-out">
                            <h3 className="font-semibold text-xl">Total Products</h3>
                            <p className="mt-2 text-gray-600">{data.products}</p>
                        </div>
                        <div className="bg-white shadow hover:shadow-lg p-4 rounded-lg transition duration-300 ease-in-out">
                            <h3 className="font-semibold text-xl">Total Orders</h3>
                            <p className="mt-2 text-gray-600">{data.orders}</p>
                        </div>
                        <div className="bg-white shadow hover:shadow-lg p-4 rounded-lg transition duration-300 ease-in-out">
                            <h3 className="font-semibold text-xl">Total Revenue</h3>
                            <p className="mt-2 text-gray-600">${data.revenue}</p>
                        </div>
                    </div>
                </section>
               
             
                <section className="mt-8">
                    <h2 className="font-semibold text-2xl">Quick Actions</h2>
                    <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4">
                        <Button as={Link} href="/add-product" className="bg-green-500 shadow hover:shadow-lg p-4 rounded-lg text-white transition duration-300 ease-in-out">
                            Add New Product
                        </Button>
                        <Button as={Link} href="/manage-orders" className="bg-yellow-500 shadow hover:shadow-lg p-4 rounded-lg text-white transition duration-300 ease-in-out">
                            Manage Orders
                        </Button>
                        <Button as={Link} href="/update-profile" className="bg-red-500 shadow hover:shadow-lg p-4 rounded-lg text-white transition duration-300 ease-in-out">
                            Update Profile
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    )
}

