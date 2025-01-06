import React from 'react'
import { productSchema } from '@/schemas/productSchema'
import axiosInstance from '@/lib/axios'
import FullProduct from '@/components/FullProduct'

export default async function ProductDetails({ params }: { params: { id: string } }) {
    const { id } = await params;

    const { data } = await axiosInstance.get(`/products/${id}`)
    const product = data

    if (!product) {
        return <div>Product not found</div>
    }

    return (
        <FullProduct product={product}  />
    )
}

