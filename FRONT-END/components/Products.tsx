/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button'
import { Checkbox } from "@nextui-org/checkbox";
import { Icon } from '@iconify/react'
import { Slider, SliderValue } from "@nextui-org/slider";
import { z } from 'zod'
import Link from 'next/link';

import { SearchIcon } from '@/components/icons'
import { productSchema } from '@/schemas/productSchema';
import { useProductsStore } from '@/Store/useProductsStore';

export default function Products({ products }: { products: z.infer<typeof productSchema>[] }) {
    const { Categories, getCategoriesForProduct } = useProductsStore();

    useEffect(() => {
        getCategoriesForProduct();
    }, []);

    const SpecialList = ["No egg", "No fish", "No peanuts"];

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
    const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Apply filters on initial load
    useEffect(() => {
        applyFilters();
    }, []);

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.includes(category)
                ? prevSelectedCategories.filter((c) => c !== category)
                : [...prevSelectedCategories, category]
        );
    };

    const handlePriceChange = (newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };

    const handleRatingChange = (rating: number) => {
        setSelectedRatings((prevSelectedRatings) =>
            prevSelectedRatings.includes(rating)
                ? prevSelectedRatings.filter((r) => r !== rating)
                : [...prevSelectedRatings, rating]
        );
    };

    const applyFilters = () => {
        let filtered = products;

        if (selectedCategories.length) {
            filtered = filtered.filter((product) => selectedCategories.includes(product.category.name));
        }

        filtered = filtered.filter((product) => {
            const discountedPrice = product.price - (product.price * (product.discount / 100));
            
            return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
        });

        if (selectedRatings.length) {
            filtered = filtered.filter((product) => selectedRatings.includes(product.rating));
        }

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        applyFilters();
    }, [selectedCategories, priceRange, selectedRatings]);

    return (
        <div className="flex flex-col justify-center items-center">
            <section>

                {/*Header Section*/}
                <div className="relative flex flex-col">
                    <div className='relative'>
                        <img alt="banner" className='w-full h-auto' src={'/images/productsBanner.png'} />
                        <div className='absolute inset-0 bg-black bg-opacity-50' />

                    </div>
                    <div className="absolute inset-0 flex flex-col flex-grow justify-center items-center mx-auto max-w-7xl container">
                        <div className="flex justify-center items-center font-sans">
                            <h1 className='shadow font-semibold text-5xl text-white'>Products</h1>
                        </div>
                        <h2 className='mt-12 font-medium text-3xl text-white'>Home/Products</h2>
                    </div>
                </div>


                <div className="flex mt-4">


                    <div className="flex flex-grow justify-center items-start gap-x-4 mx-auto max-w-7xl container">
                        <div className='p-6 border rounded-lg w-96'>
                            <h3 className='mb-4 text-xl'>Rating</h3>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className={`flex  justify-between items-center mt-2 `}>
                                    <div className='flex items-center'>
                                        {Array.from({ length: 5 - i }, (_, index) => (
                                            <Icon key={index} className='text-default' height="24" icon="stash:star-solid" width="24" />
                                        ))}
                                    </div>
                                    <Checkbox checked={selectedRatings.includes(5 - i)}
                                        defaultSelected={false}
                                        radius="none"
                                        onChange={() => handleRatingChange(5 - i)} />

                                </div>
                            ))}
                            <hr className='my-4' />
                            <h3 className='mb-4 text-xl'>Category</h3>
                            {Categories.map((category, index) => (
                                <div key={index} className='flex justify-between'>
                                    <span>{category.name}</span>
                                    <Checkbox checked={selectedCategories.includes(category.name)}
                                        defaultSelected={false}
                                        radius="none"
                                        onChange={() => handleCategoryChange(category.name)} />
                                </div>
                            ))}
                            <hr className='my-4' />
                            <div className="flex flex-col justify-center items-start gap-2 w-full max-w-md">
                                <Slider
                                    aria-label="asdx" className="max-w-md"
                                    color="foreground"
                                    formatOptions={{ style: "currency", currency: "USD" }} label="Price Range"
                                     maxValue={1000} minValue={0}
                                    size="sm"
                                    step={10}
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                />
                                <div className='flex justify-between items-center w-full'>
                                    <p className="font-medium text-default-500 text-small">
                                        Price: {Array.isArray(priceRange) && priceRange.map((b, index) => (
                                            <React.Fragment key={index}>
                                                {index > 0 && ' – '}
                                                <span key={index}>${b}</span>
                                            </React.Fragment>
                                        ))}
                                    </p>
                                    <Button className='bg-black dark:bg-default text-white'>Filter</Button>
                                </div>
                            </div>
                            <hr className='my-4' />
                            <h3 className='mb-4 text-xl'>Special Requirements</h3>
                            <div className='flex flex-col w-full'>

                                {SpecialList.map((item, index) => (
                                    <div key={index} className='flex justify-between'>
                                        <span className=''>{item}</span>
                                        <Checkbox defaultSelected={false} radius="none" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/*right section*/}
                        <div className='flex flex-col items-center w-full'>
                            {/*sarch input*/}
                            <div className='flex w-full'>
                                <Input aria-label="Search"
                                    className="rounded-none w-full" classNames={{ inputWrapper: "bg-default-100", input: "text-sm", }}
                                    endContent={<SearchIcon className="flex-shrink-0 text-base text-default pointer-events-none" />}
                                    labelPlacement="outside"
                                    placeholder="Search..."

                                    radius='none'
                                    type="search"
                                />
                                <Button radius='none' variant="flat">search</Button>
                            </div>



                            <div className='gap-4 grid sm:grid-cols-2 md:grid-cols-3 mt-6 w-full'>
                                {filteredProducts.map((item) => (
                                    <Link key={item.id} className='hover:shadow-md transform transition hover:-translate-y-2 duration-300 ease-in-out' href={"product/" + item.id?.toString() || "/"}>
                                        <div  >
                                            <div className='border rounded-large'>
                                                {/*Product Image*/}
                                                <img alt="product" className='rounded-product w-full h-64' src={typeof item.image === 'string' ? item.image : ''} />
                                                {/*Product Rating*/}
                                                <div className='flex justify-center mt-2'>
                                                    {Array.from({ length: 5 }, (_, index) => (
                                                        <Icon key={index} className={`${item.rating > index && "text-default"}`} height="24" icon="stash:star-solid" width="24" />
                                                    ))}
                                                </div>
                                                {/*Product Name*/}
                                                <h3 className='mt-4 font-bold text-center text-xl'>{item.name}</h3>
                                                {/*Product Address*/}
                                                <p className='mt-2 text-center text-gray-600'>{item?.supplier?.address}</p>
                                                {/*Product Type*/}
                                                <p className='mt-3 text-center text-red-400'>{item?.supplier?.type}</p>
                                                {/*Product Price*/}
                                                <div className='flex justify-center gap-x-4 my-2'>
                                                    <p className='text-gray-600 text-lg line-through'>${item.price}</p> {/* Add line-through class */}
                                                    <p className='font-bold text-lg text-red-400'>${item.price - (item.price * (item.discount / 100))}</p>
                                                </div>


                                            </div>


                                        </div>
                                    </Link>
                                ))}


                            </div>

                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}


