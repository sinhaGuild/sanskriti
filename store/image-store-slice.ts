// store/types.ts
import { v4 as uuidv4 } from 'uuid'; // Import the uuid function


export interface ImageMetadata {
    id: string;
    userId?: string | null | undefined
    fileName: string;
    createdDate: Date;
    description: string;
    prose: string
    year: number
    tags: string[];
    url: string;
    transformedImageUrl: string; // Add transformed image URL
    category: string
    subCategory: string
    cluster: number
    cluster_image: string
    story_description: string
    story_heading: string
}


export type ImageOutputState = {
    images: ImageMetadata[]
    latestImage: ImageMetadata
    colorizationInProgress: boolean
    shouldColorize: boolean

}

export type ImageOutputActions = {
    setImages: (images: ImageMetadata[]) => void;
    addImage: (image: ImageMetadata) => void
    fetchImagesFromStorage: () => void
    setLatestImage: (image: ImageMetadata) => void
    setColorizationInProgress: (input: boolean) => void
    setShouldColorize: (input: boolean) => void

}

export type FirebaseImageStore = ImageOutputState & ImageOutputActions



export const SkeletonImageObject: ImageMetadata = {
    id: uuidv4(),
    userId: null,
    createdDate: new Date(),
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    prose: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    year: 1900,
    fileName: "Sample Image",
    tags: ['Varanasi', '1920'],
    url: "https://storage.googleapis.com/shunyasea-sanskriti.firebasestorage.app/images/Tiger_Hill%25252C_Darjeeling%25252C_Bengal.jpg",
    transformedImageUrl: "https://storage.googleapis.com/shunyasea-sanskriti.firebasestorage.app/images/Tiger_Hill%25252C_Darjeeling%25252C_Bengal.png",
    category: "Place",
    subCategory: "Varanasi",
    cluster: 30,
    cluster_image: "https://storage.googleapis.com/shunyasea-sanskriti.firebasestorage.app/images/Shaikh-Hasan-Muhammad-Chishti%252527s-Tomb%25252C-Shahapur%25252C-Ahmadabad.jpg",
    story_heading: "Echoes of Empire",
    story_description: "Architectural Reflections of Colonial India"
}

export const initialImageOutputState: ImageOutputState = {
    images: [] as ImageMetadata[],
    latestImage: SkeletonImageObject,
    colorizationInProgress: false,
    shouldColorize: false,
}
