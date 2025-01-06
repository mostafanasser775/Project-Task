/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { z } from 'zod'
import Link from 'next/link'
import { cookies } from 'next/headers';
import { Button } from '@nextui-org/button';

import RemoveModal from './RemoveProduct';

import axiosInstance from '@/lib/axios'
import { productSchema } from '@/schemas/productSchema'


export default async function ProductsPage() {

  const cookieStore = await cookies();
  const userCookie = cookieStore.get('jwt');
   // Retrieve the JWT token from cookies

  const response = await axiosInstance.get('/products', {
    headers: {
      Authorization: `Bearer ${userCookie?.value}`,
    },
  });
  const { data } = response

  return (
    <div>
      <div className='flex justify-between'>
        <h1 className="mb-4 font-bold text-3xl">Products</h1>
        <Button as={Link} href='/dashboard/products/new-product'>Add Product</Button>
      </div>
      <div className="shadow-md rounded-lg overflow-x-auto">
        <table className="bg-white min-w-full dark:text-black">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 border-b text-start">Image</th>
              <th className="px-4 py-3 border-b text-start">Name</th>
              <th className="px-4 py-3 border-b text-start">Price</th>
              <th className="px-4 py-3 border-b text-start">Category</th>
              <th className="px-4 py-3 border-b text-start">Rating</th>
              <th className="px-4 py-3 border-b min-w-32 text-start">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product: z.infer<typeof productSchema>) => (
              <tr key={product.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="px-4 py-2 border-b">
                  <img alt={product.name} className="rounded w-16 h-16 object-cover" src={typeof product.image === 'string' ? product.image : " "} />
                </td>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">${product.price}</td>
                <td className="px-4 py-2 border-b">{product?.category?.name}</td>
                <td className="px-4 py-2 border-b">{product.rating}</td>
                <td className="px-4 py-2 border-b">
                  <Link className='text-blue-500 hover:underline' href={`/dashboard/products/edit-product/${product.id}`}>
                    Edit
                  </Link>
                  <RemoveModal Style='ml-4 text-red-500 hover:underline' id={product.id}/>
              
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

