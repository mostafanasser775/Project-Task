'use client'
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import { useUserStore } from '@/Store/useUserStore'
import { userSchema } from '@/schemas/userSchema'
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import { InputOtp } from "@nextui-org/input-otp";
import { Input } from '@nextui-org/input'
import Link from 'next/link'
import validator from 'validator'
export default function SignUp() {
    const [phone, setPhone] = useState('')
    const [error, setError] = useState('')
    const { loginUser, IsLogin } = useUserStore()
    const handleForm = (e: any) => {

        e.preventDefault()
        const parse = z.string().min(1, { message: 'Required' }).refine(validator.isMobilePhone).safeParse(phone)

        if (parse.success)
            loginUser(phone)
        else (
            (phone.length < 1) ? setError('Required') : setError("Invalid Phone Number")
        )
    }

    return (
        <section className='new-height'>
            <div className='gap-4 grid grid-cols-2'>

                {/*left section */}
                <div className='flex flex-col justify-center'>
                    <form className='gap-4 grid sm:px-16' onSubmit={handleForm}>
                        <div className='flex justify-center items-center mb-12 w-full'>
                            <Image alt='logo' height={200} src='/images/Buzzar-logo.svg' width={200} />
                        </div>

                        <Input isRequired errorMessage={error} isInvalid={Boolean(error)} label="Phone" labelPlacement="outside" radius="sm"
                            startContent={
                                <div className="flex items-center pointer-events-none">
                                    <span className="text-default-400 text-small">+20</span>
                                </div>
                            }
                            type="text" value={phone}
                            variant="bordered"
                            onChange={(e) => { setPhone(e.target.value) }} />

                        <Button isDisabled={IsLogin} isLoading={IsLogin} radius='sm' type='submit'>Login</Button>


                    </form>

                    <span className='flex justify-center gap-2 mt-4'>Don’t have an account yet? <Link className='text-[#FFBB15]' href='/sign-up'>Sign up</Link></span>

                </div>


                {/*right section hero */}
                <div className='flex justify-center'>
                    <Image src='/images/login-hero.svg' alt='login hero' width={500} height={500} />
                </div>

            </div>

        </section>
    )
}

