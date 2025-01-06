'use client'
import axiosInstance from '@/lib/axios'
import React from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
export const DeleteCategory = ({ id }: { id: string }) => {
    const router = useRouter();
    const handleDelete = async (id: string) => {
        try {
            await axiosInstance.delete(`/category/${id}`).then((res) => {
                toast.info('Category deleted')
                router.refresh()
            })
        } catch (error) {
            console.error('Failed to delete category:', error)
        }
    }

    return (
        <button
            className='ml-4 text-red-500 hover:underline'
            onClick={() => handleDelete(id)}
        >
            Delete
        </button>)
}
