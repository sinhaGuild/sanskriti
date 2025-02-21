import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27.acacia'
});


export async function POST(request: Request) {
    const { user, pricePerCredit, numOfCredits } = await request.json();
    // const { userId, pricePerCredit, numOfCredits } = await request.json();

    if (!user || !pricePerCredit || !numOfCredits) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const totalPrice = Math.round(parseFloat(pricePerCredit) * parseInt(numOfCredits));
    // console.log(totalPrice)

    try {
        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer_email: user.primaryEmailAddress.emailAddress,
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `Purchase ${numOfCredits} Credits`,
                            description: `This purchase includes ${numOfCredits} credits for use in our application.`,
                            // URL to an image
                        },
                        unit_amount: totalPrice, // Amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${request.headers.get('origin')}/?success=true`,
            cancel_url: `${request.headers.get('origin')}/?canceled=true`,
            metadata: {
                userId: user.id,
                numOfCredits: numOfCredits.toString(),
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}