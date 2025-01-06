import React from 'react'
import Link from 'next/link'
export default function PayemntConfirm() {
    return (
        <div className='flex flex-col mx-auto w-96'>

            <h2 className='text-[24px]'>Payment Successful</h2>
            <h2 className='text-[17px] text-center mt-6 text-gray-500'>we sent an email with your order confirmation</h2>

            <Link href={'/'} className='p-2 mt-6 text-white bg-blue-700'>Back To Home</Link>
        </div>
    )
}

