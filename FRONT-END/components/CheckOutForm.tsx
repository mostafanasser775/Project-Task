'use client'
import React, { useEffect } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
//import Order_API from "../_utils/Order_API";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useCartStore } from "@/Store/useCartStore";
import { useUserStore } from "@/Store/useUserStore";
export default function CheckOutForm({ amount }: { amount: any }) {
    const router = useRouter()
    const { Cart, Total, CreateOrder } = useCartStore()
    const { user } = useUserStore()
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = React.useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = React.useState(false);
    const [clientSecret, setClientSecret] = React.useState("");

    useEffect(() => {
        fetch("/api/create-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: amount })
        }).then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))

    }, [amount])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        createOrder_()

        setIsLoading(true)
        if (!clientSecret || !stripe || !elements) return;

        setIsLoading(true);

        const { error: submitError } = await elements.submit()

        if (submitError) {
            setErrorMessage(submitError.message);
            setIsLoading(false);
            return;
        }
        const { error } = await stripe.confirmPayment({
            clientSecret: clientSecret,
            elements,
            confirmParams: {
                return_url: "http://localhost:3000/payment-confirm",
            },
        });

        if (error)
            setErrorMessage(error.message);
        // else if (paymentIntent && paymentIntent.status === 'succeeded') {
        //     await createOrder_();
        //     console.log('Payment succeeded:', paymentIntent);
        // }



        setIsLoading(false);
    };
    
    const createOrder_ = async () => {
        await CreateOrder();
        //router.push('/')
    }

    return (
        <form onSubmit={handleSubmit} >
            {
                clientSecret && <PaymentElement />
            }

            <button className="bg-stone-900 mt-3 p-3 rounded-lg w-full text-white" disabled={!stripe || isLoading}>

                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}

            </button>

            {errorMessage && <div>{errorMessage}</div>}

        </form>
    )
}