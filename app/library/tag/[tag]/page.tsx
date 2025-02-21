"use client"
import ImageGalleryCardComponent from "@/components/GalleryCardComponent";
import PaginationComponent from "@/components/PaginationComponent";
import { AtomicDescriptionSample, AtomicHeading, AtomicLayout, AtomicLayoutLeft, AtomicLayoutRight } from "@/components/site-wide/atomic-layout";
import { GridHeaderComponent } from "@/components/site-wide/site-config";
import { getPagination } from "@/lib/pagination";
import { useSanskritiStore } from "@/store/store-provider";
import { use, useState } from 'react';

export default function TagDetailPage({ params }: { params: Promise<{ tag: string }> }) {

    const { tag } = use(params)
    // console.log(categoryName)

    const cleanTag = tag.replace("%20", ' ')

    const { images, shouldColorize } = useSanskritiStore((state) => state)

    const taggedImages = images.filter(image => image.tags.includes(cleanTag))

    // const filteredImages = images.filter(item => item.category === categoryName);
    // console.log(JSON.stringify(filteredImages))

    //pagination logic
    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);

    const { totalPages, currentImages } = getPagination({ images: taggedImages, currentPage: currentPage })

    return (
        <AtomicLayout>
            <AtomicLayoutLeft>
                <AtomicHeading title={cleanTag} description={AtomicDescriptionSample} />
            </AtomicLayoutLeft>
            <AtomicLayoutRight>

                <GridHeaderComponent>
                    {currentImages.length > 0 && currentImages.map((image) => (
                        <div className="px-4 sm:px-6 w-full py-4" key={image.id}>
                            <ImageGalleryCardComponent image={image} shouldColorize={shouldColorize} />
                        </div>
                    ))}
                </GridHeaderComponent>

                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </AtomicLayoutRight>
        </AtomicLayout>
    )
}