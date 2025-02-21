import { doc, getDoc, setDoc } from 'firebase/firestore';
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

        if (userDoc.exists()) {
            // User exists, return the existing record
            return NextResponse.json({ userId, credits: userDoc.data()?.credits });
        } else {
            // User does not exist, create a new record with credits initialized to 0
            const newUser = {
                userId,
                credits: 5
            }
            await setDoc(userDocRef, newUser);
            return NextResponse.json(newUser);
        }
    } catch (error) {
        return NextResponse.json({ error: `Failed to create or fetch user. ${error}` }, { status: 500 });
    }
}