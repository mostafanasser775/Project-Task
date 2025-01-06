import { Anybody } from "next/font/google";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
    apiVersion: '2024-12-18.acacia'
})

export async function POST(request: any) {
    const data: any = await request.json();
    console.log(data)
    const amount = data.amount;
    console.log('sadasd')
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            currency: 'USD',
            automatic_payment_methods: { enabled: true }
        })
        console.log("client secret", paymentIntent.client_secret)
        return NextResponse.json({ clientSecret: paymentIntent.client_secret })
    }
    catch (error: any) {
        return new NextResponse(error, { status: 400 })
    }

}
