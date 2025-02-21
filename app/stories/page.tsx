"use client"

import PaginationComponent from "@/components/PaginationComponent";
import { AtomicDescriptionSample, AtomicHeading, AtomicLayout, AtomicLayoutLeft, AtomicLayoutRight } from "@/components/site-wide/atomic-layout";
import { StoryCard, StoryHeaderComponent } from "@/components/StoryCardComponent";
import { JSONSkeleton } from "@/components/ui/skeleton/json-skeleton";
import { getPagination } from "@/lib/pagination";
import { ImageMetadata, SkeletonImageObject } from "@/store/image-store-slice";
import { useSanskritiStore } from "@/store/store-provider";
import { useState } from "react";

export default function StoriesHome() {
    const { images, shouldColorize, isFirebaseLoading } = useSanskritiStore((state) => state);
    const [currentPage, setCurrentPage] = useState(1);



    // unique clusters
    const uniqueClusters = [...new Set(images.map(item => item.cluster).filter(cluster => cluster !== null))].sort((a, b) => a - b)

    const findCluster = (cluster: number) => {
        return images.find(image => image.cluster == cluster)
    }

    const clusters: ImageMetadata[] = uniqueClusters.map(cluster => {
        const image = findCluster(cluster)
        return image ? image : SkeletonImageObject
    })

    const { totalPages, currentImages } = getPagination({ images: clusters, currentPage: currentPage, paginationItemsPerPage: 3 })

    return (
        <AtomicLayout>
            <AtomicLayoutLeft>
                <AtomicHeading title='Stories' description={AtomicDescriptionSample} />
            </AtomicLayoutLeft>
            <AtomicLayoutRight>
                <StoryHeaderComponent>
                    {isFirebaseLoading && <JSONSkeleton />}
                    {currentImages.length > 0 && currentImages.map((image) => (
                        <div key={image.id} className="px-4 sm:px-6 w-full py-4">
                            <StoryCard image={image} shouldColorize={shouldColorize} />
                        </div>
                    ))}
                </StoryHeaderComponent>
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                />
            </AtomicLayoutRight>
        </AtomicLayout>
    );


}

