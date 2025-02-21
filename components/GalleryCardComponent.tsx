"use client"
import { ImageMetadata } from "@/store/image-store-slice"
import { useRouter } from "next/navigation"
import ImageDownload from "./ImageDownload"
import { Badge } from "./ui/badge"
import { Card, CardContent, CardHeader } from "./ui/card"


const ImageGalleryCardComponent = ({ image, shouldColorize, downloadable }: { image: ImageMetadata, shouldColorize: boolean, downloadable?: boolean }) => {

    const { url, transformedImageUrl, fileName, category, subCategory, id } = image
    const { push } = useRouter()
    return (
        <Card className='transition-transform duration-300 ease-in-out group hover:shadow-xl hover:-translate-y-2'>
            <CardHeader className="p-4">
                {downloadable &&
                    <ImageDownload originalUrl={url} transformedUrl={transformedImageUrl} fileName={fileName} />
                }
                <img
                    src={shouldColorize ? transformedImageUrl : url}
                    alt={fileName}
                    className="object-cover h-[350px] cursor-pointer"
                    onClick={() => push(`/library/${category}/${subCategory}/${id}`)}
                />
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                <div className="text-lg capitalize line-clamp-1">{fileName}</div>
                <div className="flex justify-between">
                    <Badge
                        variant={"default"}
                        onClick={() => push(`/library/${category}`)}
                        className='cursor-pointer capitalize py-2'
                    >
                        {category ? category : "Uncategorized"}
                    </Badge>
                    <Badge
                        variant={"secondary"}
                        onClick={() => push(`/library/${category}/${subCategory}`)}
                        className='cursor-pointer capitalize py-2'
                    >
                        {subCategory ? subCategory : "Uncategorized"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )
}

export default ImageGalleryCardComponent