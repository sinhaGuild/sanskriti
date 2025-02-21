"use client"
import { ImageMetadata } from "@/store/image-store-slice"
import { useRouter } from "next/navigation"
import ImageDownload from "./ImageDownload"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Separator } from "./ui/separator"


export const StoryCard = ({ image, downloadable }: { image: ImageMetadata, shouldColorize: boolean, downloadable?: boolean }) => {

    const { url, transformedImageUrl, fileName, cluster, cluster_image, story_heading, story_description } = image
    const { push } = useRouter()
    return (
        <Card className='transition-transform duration-300 ease-in-out group hover:shadow-xl hover:-translate-y-2 grid cursor-pointer' onClick={() => push(`/stories/${cluster}`)}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 px-0 w-full container max-w-screen-2xl">
                <CardHeader className="md:col-span-2">
                    {downloadable &&
                        <ImageDownload originalUrl={url} transformedUrl={transformedImageUrl} fileName={fileName} />
                    }
                    <img
                        src={cluster_image}
                        alt={fileName}
                        className="object-cover h-[350px] rounded-lg"

                    />
                </CardHeader>
                <CardContent className="py-4 col-span-1 space-y-4">
                    <div className="lg:text-8xl text-7xl font-bold font-hindi text-orange-500 justify-self-center">{cluster}.</div>
                    <Separator className="w-[90%]" />
                    <div className="xl:text-6xl lg:text-5xl text-3xl">{story_heading}</div>
                    <div className="lg:text-xl text-lg">{story_description}</div>
                </CardContent>
            </div>
        </Card>
    )
}

export const StoryHeaderComponent = ({ children }: { children: React.ReactNode }) => {
    return <div className="grid grid-cols-1 gap-2 w-full container max-w-screen-2xl">{children}</div>
}
