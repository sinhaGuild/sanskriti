import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';

export async function POST(request: Request) {
    const { userId } = await request.json();

    if (!userId) {
        return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        }

        const currentCredits = userDoc.data()?.credits;

        if (currentCredits <= 0) {
            return NextResponse.json({ error: 'Credits cannot be less than zero' }, { status: 400 });
        }

        // Decrease the user's credits by 1
        await updateDoc(userDocRef, { credits: currentCredits - 1 });

        return NextResponse.json({ userId, credits: currentCredits - 1 });
    } catch (error) {
        return NextResponse.json({ error: `Failed to decrement user credits. ${error}` }, { status: 500 });
    }
}