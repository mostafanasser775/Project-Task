import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/button'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col flex-grow mx-auto px-4 max-w-7xl'>
            <div className="flex md:flex-row flex-col shadow-lg rounded-lg overflow-hidden">
                {/* Sidebar */}
                <aside className="bg-gray-800 dark:bg-gray-100 w-full md:w-64 min-h-[calc(100vh-88px)] text-white dark:text-black transform transition-transform duration-300 ease-in-out">
                    <div className="p-4">
                        <h2 className="font-semibold text-center text-xl">Supplier Dashboard</h2>
                    </div>
                    <hr />
                    <nav className="flex flex-col gap-2 mt-4 px-2">
                        <Button as={Link} className='bg-transparent hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-black transition duration-300 ease-in-out' href="/dashboard" radius='sm' variant='flat'>
                            Dashboard
                        </Button>
                        <Button as={Link} className='bg-transparent hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-black transition duration-300 ease-in-out' href="/dashboard/products" radius='sm' variant='flat'>
                            Products
                        </Button>
                        <Button as={Link} className='bg-transparent hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-black transition duration-300 ease-in-out' href="/dashboard/categories" radius='sm' variant='flat'>
                        Categories
                        </Button>
                        <Button as={Link} className='bg-transparent hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-black transition duration-300 ease-in-out' href="/dashboard/categories-products" radius='sm' variant='flat'>
                        Categories and Products
                        </Button>
                        <Button as={Link} className='bg-transparent hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-black transition duration-300 ease-in-out' href="/dashboard/settings" radius='sm' variant='flat'>
                            Settings
                        </Button>
                        <Button as={Link} className='bg-transparent hover:bg-gray-700 dark:hover:bg-gray-300 text-white dark:text-black transition duration-300 ease-in-out' href="/dashboard/more" radius='sm' variant='flat'>
                            More
                        </Button>
                    </nav>
                </aside>

                {/* Content */}
                <main className="flex-1 bg-gray-50 dark:bg-gray-900 p-8 transform transition-transform duration-300 ease-in-out">
                    {children}
                </main>
            </div>
        </div>
    )
}

