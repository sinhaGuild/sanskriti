
'use client'; // Mark this as a client component

import { useSanskritiStore } from '@/store/store-provider';
import { useEffect } from 'react';

export default function HydrateSite() {
    const fetchImagesFromStorage = useSanskritiStore((state) => state.fetchImagesFromStorage);

    useEffect(() => {
        // Call the function to fetch images on first load
        fetchImagesFromStorage();
    }, [fetchImagesFromStorage]);

    return null; // This component doesn't render anything
}