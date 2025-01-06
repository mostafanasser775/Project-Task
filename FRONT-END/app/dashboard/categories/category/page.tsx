'use client'
import React, { useState } from 'react'

import axiosInstance from '@/lib/axios'
import { useRouter } from 'next/navigation'

const NewCategory = () => {
    const [name, setName] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await axiosInstance.post('/category', { name }).then((res)=>{
                console.log(res)
            })
            router.push('/dashboard/categories')
        } catch (error) {
            console.error('Failed to add category:', error)
        }
    }

    return (
        <div>
            <h1 className="mb-4 ml-8 font-bold text-3xl">Add New Category</h1>
            <form onSubmit={handleSubmit} className="mb-4 px-8 pt-6 pb-8 rounded">

                <div className="mb-4 w-80">
                    <label className="block mb-2 font-bold text-gray-700 text-sm" htmlFor="name">
                        Name
                    </label>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                        className="shadow focus:shadow-outline px-3 py-2 border rounded w-full text-gray-700 leading-tight appearance-none focus:outline-none"
                        required
                    />

                </div>

                <div className="flex justify-between items-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 focus:shadow-outline px-4 py-2 rounded font-bold text-white focus:outline-none"
                    >
                        Add Category
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewCategory