import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';

export async function POST(request: Request) {
    const { userId, credits } = await request.json();

    if (!userId || credits === undefined) {
        return NextResponse.json({ error: 'userId and credits are required' }, { status: 400 });
    }

    try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return NextResponse.json({ error: 'User does not exist' }, { status: 404 });
        }

        // Update the user's credits
        await updateDoc(userDocRef, { credits });

        return NextResponse.json({ userId, credits });
    } catch (error) {
        return NextResponse.json({ error: `Failed to update user credits. ${error}` }, { status: 500 });
    }
}