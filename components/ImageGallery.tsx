"use client"
import { useState } from 'react';
// import ReactBeforeSliderComponent from 'react-before-after-slider-component';
// import 'react-before-after-slider-component/dist/build.css';
import { GridHeaderComponent } from '@/components/site-wide/site-config';
import { getPagination } from '@/lib/pagination';
import { useSanskritiStore } from "@/store/store-provider";
import ImageGalleryCardComponent from './GalleryCardComponent';
import PaginationComponent from './PaginationComponent';
import { AtomicDescriptionSample, AtomicHeading, AtomicLayout, AtomicLayoutLeft, AtomicLayoutRight } from './site-wide/atomic-layout';
import { JSONSkeleton } from './ui/skeleton/json-skeleton';




const ImageGallery = () => {

    const { images, shouldColorize, isFirebaseLoading } = useSanskritiStore((state) => state);

    // useEffect(() => {
    //     fetchImagesFromStorage()
    // }, [])



    const [currentPage, setCurrentPage] = useState(1);

    const { totalPages, currentImages } = getPagination({ images: images, currentPage: currentPage })



    return (

        // <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  w-full mx-auto">
        <AtomicLayout>
            <AtomicLayoutLeft>
                <AtomicHeading title='Gallery' description={AtomicDescriptionSample} />
            </AtomicLayoutLeft>
            <AtomicLayoutRight>
                <GridHeaderComponent>
                    {isFirebaseLoading && <JSONSkeleton />}
                    {currentImages.length > 0 && currentImages.map((image) => (
                        <div key={image.id} className="px-4 sm:px-6 w-full py-4">
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
        // <div className="flex flex-row pt-10 pl-4">
        //     <div className="w-1/6 px-2 items-center self-start">
        //         <BackButton />
        //         <div className="text-7xl py-4 capitalize">Gallery</div>
        //         <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis obcaecati architecto ut accusamus dicta autem fugiat blanditiis magni recusandae? Rem doloribus soluta, beatae nam quod id voluptates alias itaque enim?</span>
        //     </div>
        //     <div className='w-4/6'>
        //         <GridHeaderComponent>
        //             {currentImages.length > 0 && currentImages.map((image) => (
        //                 <div key={image.id} className="px-4 sm:px-6 w-full py-4">
        //                     <ImageGalleryCardComponent image={image} shouldColorize={shouldColorize} />
        //                 </div>
        //             ))}
        //         </GridHeaderComponent>
        //         <PaginationComponent
        //             currentPage={currentPage}
        //             totalPages={totalPages}
        //             setCurrentPage={setCurrentPage}
        //         />
        //     </div>
        // </div>
    );
};




export default ImageGallery;