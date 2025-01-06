'use client'
import React from 'react'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Input } from '@nextui-org/input'
import Link from 'next/link'

import { userSchema } from '@/schemas/userSchema'
import { useUserStore } from '@/Store/useUserStore'
export default function SignUp() {
    const { addUser, IsSignUp } = useUserStore()


    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof userSchema>>({
        resolver: zodResolver(userSchema),
    });

    const onSubmit: SubmitHandler<any> = async (data) => {
       await addUser(data);

    }

    return (
        <section className='new-height'>
            <div className='gap-4 grid grid-cols-2'>


                {/*left section  */}
                <div className='flex flex-col justify-center'>
                    <form noValidate className='gap-4 grid sm:px-16' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex justify-center items-center mb-12 w-full'>
                            <Image alt='logo' height={200} src='/images/Buzzar-logo.svg' width={200} />
                        </div>

                        <Input type="text" {...register('name')} isRequired errorMessage={errors.name?.message} isInvalid={Boolean(errors?.name)} label="Full Name"
                            labelPlacement="outside" placeholder="enter your full name"
                            radius="sm" variant="bordered" />

                        <Input type="text" {...register('phone')} isRequired errorMessage={errors.phone?.message} isInvalid={Boolean(errors?.phone)} label="Phone"
                            labelPlacement="outside" radius="sm"
                            startContent={
                                <div className="flex items-center pointer-events-none">
                                    <span className="text-default-400 text-small">+20</span>
                                </div>
                            }
                            variant="bordered" />


                        <Button isDisabled={IsSignUp} isLoading={IsSignUp} radius='sm' type='submit'>Sign Up</Button>
                        <span className='flex justify-center gap-2 mt-4'>Already have an account ? <Link className='text-[#FFBB15]' href='/login'>Login</Link></span>

                    </form>
                </div>


                {/*right section hero */}
                <div className='flex justify-center'>
                    <Image alt='sign-up hero' height={500} src='/images/sign-up-hero.svg' width={500} />
                </div>

            </div>
        </section>
    )
}

