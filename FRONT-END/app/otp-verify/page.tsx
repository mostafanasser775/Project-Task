'use client'
import React, { useState } from 'react'
import { Button } from '@nextui-org/button'
import Image from 'next/image'
import { InputOtp } from "@nextui-org/input-otp";

import { useUserStore } from '@/Store/useUserStore'

const maskPhoneNumber = (phone: string) => {
    return phone.slice(0, -3).replace(/./g, '*') + phone.slice(-3);
};

export default function OtpVerify() {
    const [OTP, setOTP] = useState('')
    const [error, setError] = useState('')
    const { phone, verifyOtp } = useUserStore()


  

    const handleForm = (e: any) => {

        e.preventDefault();
        (OTP.length < 1) ? setError('Required') : (OTP.length === 6) ?
            verifyOtp(OTP)
            : setError("Invalid OTP")
    }

    return (
        <section className='new-height'>
            <div className='gap-4 grid grid-cols-2'>

                {/*left section */}
                <div className='flex flex-col justify-center'>
                    <div className='gap-4 grid sm:px-16'>
                        <div className='flex justify-center items-center mb-12 w-full'>
                            <Image alt='logo' height={200} src='/images/Buzzar-logo.svg' width={200} />
                        </div>
                        <h1 className='text-3xl text-gray-900'> Welcome</h1>
                        <form noValidate onSubmit={handleForm}>
                            <span className='text-gray-900 text-small'> Enter the authentication code we sent at {maskPhoneNumber(phone)}</span>



                            <div className="flex flex-col gap-2 w-full">
                                <InputOtp length={6} value={OTP} variant="bordered" onValueChange={setOTP} />
                            </div>
                            <Button radius='sm' type='submit'>Verify Account</Button>

                        </form>
                    </div>

                </div>


                {/*right section hero */}
                <div className='flex justify-center'>
                    <Image alt='otp hero' height={500} src='/images/otp-hero.svg' width={500} />
                </div>

            </div>

        </section>
    )
}

