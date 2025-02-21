"use client"
import ImageDetailPageComponent from "@/components/ImageDetailPageComponent";
import {useSanskritiStore} from "@/store/store-provider";
import { use } from 'react';

export default function ImageDetailPage({ params }: { params: Promise<{ imageId: string }> }) {

    const { imageId } = use(params)
    // console.log(categoryName)

    const { images, shouldColorize } = useSanskritiStore((state) => state)
    const filteredImage = images.find(item => item.id === imageId)
    const relatedImages = images.filter(item => item.category === filteredImage?.category);
    // console.log(JSON.stringify(relatedImages))

    return (
        <div >
            {filteredImage && <div>
                <ImageDetailPageComponent
                    image={filteredImage}
                    relatedImages={relatedImages}
                    shouldColorize={shouldColorize}
                />
            </div>
            }
            {!filteredImage && <div><h1 className="text-3xl font-bold capitalize">Image Does not exist.</h1></div>}
        </div>
    )
}
