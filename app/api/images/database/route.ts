import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { db } from '../../../../lib/firebase';

export async function GET() {
    try {
        const imagesCollection = collection(db, 'images');
        // Create a query that orders the documents by the 'createdDate' field in ascending order
        const q = query(imagesCollection, orderBy('createdDate', 'desc'));

        // Execute the query
        const snapshot = await getDocs(q);

        // const snapshot = await getDocs(imagesCollection);
        const imagesMetadata = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return NextResponse.json(imagesMetadata);
    } catch (error) {
        console.error("Error fetching data from Firestore:", error); // Log the error for debugging
        return NextResponse.json({ error: 'Failed to fetch data from Firestore' }, { status: 500 });
    }
}