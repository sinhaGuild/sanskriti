import { getDownloadURL, getStorage, listAll, ref } from 'firebase/storage';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const storageRef = getStorage();
        const listRef = ref(storageRef, 'images/'); // Adjust the path as needed

        const result = await listAll(listRef);
        const urls = await Promise.all(result.items.map(item => getDownloadURL(item)));

        return NextResponse.json(urls);
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to fetch images from storage' }, { status: 500 });
    }
}