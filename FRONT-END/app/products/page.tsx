/* eslint-disable @next/next/no-img-element */
import React from 'react'

import Products from '@/components/Products';
import axiosInstance from '@/lib/axios';
export default async function ProductsPage() {
    const { data } = await axiosInstance.get("/products")

    return (
        <Products products={data} />
    )
}


