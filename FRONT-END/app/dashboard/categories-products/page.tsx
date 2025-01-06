import React from 'react'
import Link from 'next/link'
import axiosInstance from '@/lib/axios'
import { z } from 'zod'
import { productSchema } from '@/schemas/productSchema'

const defaultCategories = [
  { id: 1, name: 'Electronics', description: 'Electronic items' },
  { id: 2, name: 'Books', description: 'Books and literature' },
  { id: 3, name: 'Clothing', description: 'Apparel and accessories' }
]

const defaultProducts = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics', rating: 4.5, image: '/images/laptop.jpg' },
  { id: 2, name: 'Smartphone', price: 699, category: 'Electronics', rating: 4.7, image: '/images/smartphone.jpg' },
  { id: 3, name: 'Novel', price: 19, category: 'Books', rating: 4.3, image: '/images/novel.jpg' },
  { id: 4, name: 'T-shirt', price: 29, category: 'Clothing', rating: 4.1, image: '/images/tshirt.jpg' }
]

export default async function CategoriesAndProducts() {
  const categoriesResponse = await axiosInstance.get('/categories').catch(() => ({ data: defaultCategories }))
  const categoriesData = categoriesResponse.data

  const productsResponse = await axiosInstance.get('/products').catch(() => ({ data: defaultProducts }))
  const productsData = productsResponse.data

  return (
    <div>
      <h1 className="mb-4 font-bold text-3xl">Categories</h1>
      <div className="space-y-6">
        {categoriesData.map((category: any) => (
          <div key={category.id} className="bg-white shadow-md rounded-lg dark:text-black overflow-hidden">
            <div className="bg-gray-200 p-4">
              <h2 className="font-semibold text-2xl">{category.name}</h2>
              <p className="text-gray-600">{category.description}</p>
              <div className="mt-2">
                <Link className='text-blue-500 hover:underline' href={`/dashboard/categories/edit/${category.id}`}>
                  Edit
                </Link>
                <Link className='ml-4 text-red-500 hover:underline' href={`/dashboard/categories/delete/${category.id}`}>
                  Delete
                </Link>
              </div>
            </div>
            <div className="p-4">
              <table className="bg-white min-w-full dark:text-black">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-3 border-b text-start">Image</th>
                    <th className="px-4 py-3 border-b text-start">Name</th>
                    <th className="px-4 py-3 border-b text-start">Price</th>
                    <th className="px-4 py-3 border-b text-start">Category</th>
                    <th className="px-4 py-3 border-b text-start">Rating</th>
                    <th className="px-4 py-3 border-b text-start">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productsData
                    .filter((product: z.infer<typeof productSchema>) => product.category === category.name)
                    .map((product: z.infer<typeof productSchema>) => (
                      <tr key={product.id} className="hover:bg-gray-100 transition-colors duration-200">
                        <td className="px-4 py-2 border-b">
                          <img alt={product.name} className="rounded w-16 h-16 object-cover" src={product.image} />
                        </td>
                        <td className="px-4 py-2 border-b">{product.name}</td>
                        <td className="px-4 py-2 border-b">${product.price}</td>
                        <td className="px-4 py-2 border-b">{product.category}</td>
                        <td className="px-4 py-2 border-b">{product.rating}</td>
                        <td className="px-4 py-2 border-b">
                          <Link className='text-blue-500 hover:underline' href={`/dashboard/products/edit/${product.id}`}>
                            Edit
                          </Link>
                          <Link className='ml-4 text-red-500 hover:underline' href={`/dashboard/products/delete/${product.id}`}>
                            Delete
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Link href="/dashboard/categories/create">
          {/* <a className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white transition-colors duration-200"> */}
            Add New Category
          {/* </a> */}
        </Link>
      </div>
    </div>
  )
}

