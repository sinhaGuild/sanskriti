import { collection, getDocs } from 'firebase/firestore/lite';
import { NextResponse } from 'next/server';
import { db } from '../../../lib/firebase'; // Ensure this import is correct

export async function GET() {
    try {
        // const storageRef = getStorage();
        // const listRef = ref(storage, 'images/'); // Use the storage reference directly

        // const result = await listAll(listRef);
        // const urls = await Promise.all(result.items.map(item => getDownloadURL(item)));

        // Fetch metadata from Firestore
        const imagesCollection = collection(db, 'images');
        const snapshot = await getDocs(imagesCollection);
        const imagesMetadata = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // return NextResponse.json(urls);
        return NextResponse.json(imagesMetadata);

    } catch (error) {
        console.error('Error fetching images:', error); // Log the error for debugging
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}