import { db } from '@/lib/firebase';
import { doc, increment, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
    const sig = request.headers.get('Stripe-Signature');
    const body = await request.text();

    // console.log('Received webhook:', body); // Log the incoming webhook


    let event;

    try {
        event = stripe.webhooks.constructEvent(body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
        return NextResponse.json({ error: `Webhook Error ${err}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        // Extract userId and credits from metadata
        if (session.metadata) {

            const userId = session.metadata.userId;
            const numOfCredits = parseInt(session.metadata.numOfCredits, 10);
            // console.log(`userId: ${userId} to be updated with ${numOfCredits} credits.`)

            // Update firestore user with number of credits
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                credits: increment(numOfCredits), // Assuming you have a credits field
            });
        }
    }

    return NextResponse.json({ received: true });
}