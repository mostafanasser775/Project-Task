'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input, Textarea } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Icon } from '@iconify/react'
import Image from 'next/image'
import { Select, SelectItem } from '@nextui-org/select'

import { productSchema } from '@/schemas/productSchema'
import { useProductsStore } from '@/Store/useProductsStore'
import axiosInstance from '@/lib/axios'

export default function EditProductPage() {
  const router = useRouter()
  const { id } = useParams()
  const { Categories, getCategoriesForProduct, updateProduct, isUpdating } = useProductsStore()
  const [product, setProduct] = useState<z.infer<typeof productSchema> | null>(null)
  const [selectedImg, setSelectedImg] = useState<string | ArrayBuffer | null>(null)
  const [category, setCategory] = React.useState(new Set([]));

  useEffect(() => {
    if (id) {
      fetchProductDetails(id as string)
    }
    getCategoriesForProduct()
  }, [id])

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await axiosInstance.get(`/products/${productId}`)
      const data = response.data
      delete data.id
      setCategory(data.categoryId)
      setProduct(data)
      setSelectedImg(data.image)
      reset(data)
    } catch (error) {
      console.error('Error fetching product details:', error)
    }
  }

  const { register, getValues, setValue, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: product || {}
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log(data)
    delete data.supplier
    data.category=category

    data.price = Number(data.price)
    data.discount = Number(data.discount)
    await updateProduct(id as string, data)
    router.push('/dashboard/products')
  }

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.readAsDataURL(file)

    reader.onload = async () => {
      const base64Image = reader.result

      setSelectedImg(base64Image)
      if (base64Image) {
        setValue('image', base64Image)
      }
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <div>
      <form noValidate className='gap-4 grid grid-cols-1' onSubmit={handleSubmit(onSubmit)}>
        <Input type='text' {...register('name')} isRequired errorMessage={errors.name?.message}
          isInvalid={Boolean(errors?.name)} label='Product Name' labelPlacement='outside'
          placeholder='Enter Product Name' radius='sm' variant='bordered' />

        <div className='sm:gap-x-2 grid sm:grid-cols-2'>
          <Input type='number' {...register('price', { valueAsNumber: true })} isRequired label='Price' labelPlacement='outside' max={10000} min={0} placeholder='enter price' radius='sm' variant='bordered' />

          <Input type='number' {...register('discount', { valueAsNumber: true })} isRequired label='discount' labelPlacement='outside' max={100} min={1} placeholder='enter discount' radius='sm' variant='bordered' />
        </div>

        <Textarea  {...register('description')}
          label='Description' labelPlacement='outside'
          placeholder='enter your description' radius='sm' variant='bordered' />


        <Select className='max-w-xs'
          defaultSelectedKeys={[String(category)]} label='Category' labelPlacement='outside'
          placeholder='Select an Category'
          variant='bordered'
          onChange={(e) => {
            console.log(product.category)
            setValue('category', e.target.value)
            console.log(category)
          }}>
          {Categories.map((category) => (

            <SelectItem key={(category.id)} value={category.name}>{category.name}</SelectItem>
          ))}
        </Select>

        <div className='flex flex-col items-start mt-4'>
          <div className='relative'>
            <Button className='right-0 absolute flex justify-center items-center m-2'
              isIconOnly size='sm' variant="ghost" onPress={() => setSelectedImg(null)}>
              <Icon icon="ri:close-large-fill" width="20" height="20" />
            </Button>

            {typeof selectedImg === 'string' ? (
              <Image
                alt='Profile'
                className='border-4 rounded-lg w-72 h-48 object-cover'
                height={288}
                src={selectedImg}
                width={192}
              />
            ) : (
              <div className='flex flex-col justify-center items-center bg-gray-200 rounded-lg w-72 h-48'>
                <p className='mb-4 text-sm text-zinc-400'>
                  {isUpdating ? 'Uploading...' : 'Click the camera to upload your product'}
                </p>
                <div className='flex justify-center items-center border-gray-300 border rounded-xl w-14 h-14'>
                  <label className={` bg-base-content hover:scale-105 rounded-full cursor-pointer transition-all duration-200
                  ${isUpdating ? 'animate-pulse pointer-events-none' : ''}`} htmlFor='avatar-upload'>
                    <Icon height='36' icon='lucide:camera' width='36' />
                    <input accept='image/*' className='hidden' disabled={isUpdating} id='avatar-upload' type='file' onChange={handleImageUpload} />
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button isDisabled={isUpdating} isLoading={isUpdating} radius='sm' type='submit'>Update Product</Button>
      </form>
    </div >
  )
}