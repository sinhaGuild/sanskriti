import { getPagination } from "@/lib/pagination"
import { ImageMetadata } from "@/store/image-store-slice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { v4 } from 'uuid'
import ImageGalleryCardComponent from "./GalleryCardComponent"
import PaginationComponent from "./PaginationComponent"
import BackButton from "./site-wide/back-button"
import { Badge } from "./ui/badge"


const ImageDetailPageComponent = ({ image, relatedImages, shouldColorize }: { image: ImageMetadata, relatedImages: ImageMetadata[], shouldColorize: boolean }) => {
    const { description, fileName, category, subCategory, tags, url, transformedImageUrl, prose, year } = image
    const { push } = useRouter()
    console.log(tags)


    //pagination logiv
    const [currentPage, setCurrentPage] = useState(1);

    const { totalPages, currentImages } = getPagination({ images: relatedImages, currentPage: currentPage, paginationItemsPerPage: 3 })


    return (
        <div className="flex flex-col container max-w-screen-xl pt-4">
            <main className="flex-1">
                <section className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start  px-4 mx-auto py-6 max-w-[100rem]">
                    <div className="">
                        <div className="absolute pl-4 pt-4">
                            <BackButton />
                        </div>
                        <img
                            src={shouldColorize ? transformedImageUrl : url}
                            alt={fileName}
                            width={600}
                            height={900}
                            className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
                        />

                    </div>
                    <div className="grid gap-4 md:gap-10">
                        <div className="grid gap-2">
                            <h1 className="text-3xl font-bold capitalize">{fileName}</h1>
                            <p className="text-muted-foreground">{year}</p>
                            <p className="text-muted-foreground">{description}</p>
                        </div>
                        <div className="grid gap-2 space-y-4">
                            <div className="text-4xl font-bold capitalize">Category</div>
                            <Badge
                                variant={"default"}
                                onClick={() => push(`/library/${category}`)}
                                className='cursor-pointer capitalize py-2 w-fit'
                            >
                                {category ? category : "Uncategorized"}
                            </Badge>
                            <div className="text-2xl font-bold capitalize">Sub Category</div>
                            <Badge
                                variant={"secondary"}
                                onClick={() => push(`/library/${category}/${subCategory}`)}
                                className='cursor-pointer capitalize py-2 w-fit'
                            >
                                {subCategory ? subCategory : "Uncategorized"}
                            </Badge>
                            {Array.isArray(tags) &&
                                <div>
                                    <div className="text-2xl font-bold capitalize ">Tags</div>
                                    <div className="space-x-2 flex py-2">
                                        {tags.map((tag) => (
                                            <div key={v4()}>
                                                {tag &&
                                                    <Badge
                                                        key={v4()}
                                                        variant={"outline"}
                                                        className='capitalize py-2 w-fit text-muted-foreground cursor-pointer'
                                                        onClick={() => push(`/library/tag/${tag}`)}
                                                    >
                                                        {tag}
                                                    </Badge>}</div>))
                                        }
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </section>
                <section className="grid gap-6 px-4 mx-auto py-6 max-w-[100rem]">
                    <div className="grid gap-4 text-sm leading-loose">
                        <div className="text-4xl font-bold capitalize">Description</div>
                        <p>{prose}
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <h2 className="text-4xl font-bold">Related Images</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {currentImages.length > 0 && currentImages.map((image) => (
                                <div className="px-4 sm:px-6 w-full py-4" key={image.id}>
                                    <ImageGalleryCardComponent image={image} shouldColorize={shouldColorize} />
                                </div>
                            ))}
                        </div>
                        <PaginationComponent
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </section>
            </main>
        </div>
    )
}

export default ImageDetailPageComponent