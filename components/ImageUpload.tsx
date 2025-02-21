"use client"
import { UploadButton } from '@/components/site-wide/upload-button';
import { sleep } from '@/lib/utils';
import { ImageMetadata } from '@/store/image-store-slice';
import { useSanskritiStore } from "@/store/store-provider";
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function
import { db, storage } from '../lib/firebase';

const ImageUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const { fetchImagesFromStorage, setLatestImage, colorizationInProgress, setColorizationInProgress, currentUser, debitUserCredit } = useSanskritiStore((state) => state);

    // const { user } = useUser()
    // const [buttonClicked, setButtonClicked] = useState(false)

    // Replicate
    // const [prediction, setPrediction] = useState(null);
    // const [error, setError] = useState(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            // setButtonClicked(true)
            setColorizationInProgress(true)
            const uniqueId = uuidv4();
            const storageRef = ref(storage, `images/${uniqueId}-${file.name}`); // Use the unique ID in the file 
            // const storageRef = ref(storage, `images/${file.name}`);

            await uploadBytes(storageRef, file);

            const url = await getDownloadURL(storageRef); // Get the download URL
            console.log(`original image: ${url}`)

            // Call the transformation API
            const response = await fetch('/api/transform', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl: url }),
            });

            // Get the response from replicate whether prediction has started
            let prediction = await response.json()

            if (response.status !== 201) {
                console.error(prediction.detail);
                return;
            }

            // Set Temporary prediction status
            // setPrediction(prediction);

            // Wait for prediction cycle to complete and then get the url
            while (
                prediction.status !== "succeeded" &&
                prediction.status !== "failed"
            ) {
                await sleep(1000);
                const response = await fetch("/api/transform/" + prediction.id);
                prediction = await response.json();
                if (response.status !== 200) {
                    console.error(prediction.detail);
                    return;
                }
                console.log({ prediction: prediction });
                // setPrediction(prediction);
            }

            // download the file from replicate output url and save it to firebase storage
            // Download the transformed image and save it to Firebase Storage
            console.log(`Prediction completed with ${prediction.output}`)
            const replicate_output = await fetch(prediction.output);
            const blob = await replicate_output.blob();
            const transformedImageRef = ref(storage, `images/replicate_${uniqueId}-${file.name}`);
            await uploadBytes(transformedImageRef, blob);
            const transformedImageUrl = await getDownloadURL(transformedImageRef);

            // Call OpenAI endpoint to generate metadata
            const metadata = await generateMetadata(transformedImageUrl)

            // console.log(`transformed image firebase url: ${transformedImageUrl}`)

            try {

                const gen = {
                    fileName: file.name,
                    createdDate: new Date(),
                    description: metadata.description,
                    tags: metadata.tags, // Convert tags to an array
                    url,
                    transformedImageUrl, // Add the transformed image URL
                    category: metadata.category,
                    subCategory: metadata.subCategory,
                    prose: metadata.detailedDescription,
                    userId: currentUser?.userId,
                    year: metadata.year,
                    cluster: 100,
                    story_heading: "User Generated",
                    story_description: "Not Available",
                    cluster_image: transformedImageUrl
                }

                const docRef = await addDoc(collection(db, 'images'), gen);


                // Create a separte object for the latest image.
                const latestImage: ImageMetadata = {
                    id: docRef.id,
                    ...gen
                }

                //Set latest image to context store
                setLatestImage(latestImage)

                debitUserCredit(currentUser.userId)

                fetchImagesFromStorage()

            } catch (error) {
                console.error('Error adding document: ', error);
            }


            setFile(null);

            // setButtonClicked(false)
            setColorizationInProgress(false)
        }
    };

    const generateMetadata = async (transformedImageUrl: string) => {
        const response = await fetch('/api/openai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ transformedImageUrl }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate metadata');
        }

        const data = await response.json();
        return data.metadata; // Return the generated metadata
    }

    return (
        <div>
            <div className='mb-6'>
                <label className="block mb-6 text-sm font-medium text-gray-900 dark:text-gray-300">Upload file</label>
                <input className="flex w-full rounded-md border border-input bg-background px-3 py-4 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50" type="file" onChange={handleFileChange}></input>
                {/* <input className='bg-slate-100 px-4 py-2' type="file" onChange={handleFileChange} /> */}
            </div>
            {/* <button className='bg-slate-200 text-slate-800 px-6 py-2 rounded-lg' onClick={handleUpload}>Upload</button> */}
            {/* {!buttonClicked && <Button onClick={handleUpload}>Upload</Button>}
            {buttonClicked && <Button onClick={handleUpload}>Upload</Button>} */}
            <UploadButton
                loading={colorizationInProgress}
                onClick={handleUpload}
                btnTitle='Colorize'
                loadingTitle='Colorizing..'
            />

        </div>
    );
};

export default ImageUpload;