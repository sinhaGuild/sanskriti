"use client"
import ImageGalleryCardComponent from "@/components/GalleryCardComponent";
import PaginationComponent from "@/components/PaginationComponent";
import BackButton from "@/components/site-wide/back-button";
import { GridHeaderComponent } from "@/components/site-wide/site-config";
import { getPagination } from "@/lib/pagination";
import { useSanskritiStore } from "@/store/store-provider";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function ColorizedArchivePage() {

    const { user } = useUser()
    // console.log(categoryName)

    const { images, shouldColorize } = useSanskritiStore((state) => state)


    const filteredImages = user ? images.filter(item => item.userId === user.id) : [];

    // console.log(JSON.stringify(filteredImages))


    // Pagination logic
    const [currentPage, setCurrentPage] = useState(1);

    const { totalPages, currentImages } = getPagination({ images: filteredImages, currentPage: currentPage })

    return (
        <div className="">
            <div className="flex px-2 items-center">
                <BackButton />
                <div className="text-4xl px-4 py-4 capitalize">Generations Archive</div>
            </div>

            <GridHeaderComponent>
                {currentImages.length > 0 && currentImages.map((image) => (
                    <div className="px-4 sm:px-6 w-full py-4" key={image.id}>
                        <ImageGalleryCardComponent image={image} shouldColorize={shouldColorize} downloadable />
                    </div>
                ))}
            </GridHeaderComponent>


            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}