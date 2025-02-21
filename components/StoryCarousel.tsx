
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel"
import { ImageMetadata } from "@/store/image-store-slice"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import { TypographyP, TypographyTitle } from "./site-wide/typography"
import { Badge } from "./ui/badge"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"


export function StoryCarousel({ images, shouldColorize }: { images: ImageMetadata[], shouldColorize: boolean }) {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    const arrowStyles = "[&_svg]:w-[2rem] [&_svg]:h-[3rem] p-8 bg-black text-white dark:bg-white dark:text-black -mx-2 shadow-lg dark:hover:bg-slate-800 dark:hover:text-white"

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    return (
        <div>
            <div className="py-2 text-center text-sm text-muted-foreground ">
                {current + 1} / {count + 1}
            </div>
            <Carousel className="w-full max-w-5xl mx-auto" setApi={setApi}>
                <CarouselContent>
                    {images.map((image, index) => (
                        <Dialog key={index}>
                            <DialogTrigger asChild>
                                <CarouselItem key={index} className="">
                                    <Card className="border-0">
                                        <CardContent className="flex items-center justify-center p-6 h-[500px]">
                                            {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
                                            <img
                                                src={shouldColorize ? image.transformedImageUrl : image.url}
                                                alt={image.fileName}
                                                className="object-cover rounded-lg"

                                            />
                                        </CardContent>
                                    </Card>

                                </CarouselItem>
                            </DialogTrigger>
                            <DialogContent className="min-w-fit max-h-screen">
                                <DialogHeader className="py-4">
                                    <DialogTitle className="capitalize">{image.fileName}</DialogTitle>
                                </DialogHeader>
                                <img
                                    src={shouldColorize ? image.transformedImageUrl : image.url}
                                    alt={image.fileName}
                                    className="object-cover rounded-lg max-h-[80vh]"

                                />
                            </DialogContent>
                        </Dialog>
                    ))}
                </CarouselContent>
                <CarouselPrevious className={arrowStyles} />
                <CarouselNext className={arrowStyles} />
            </Carousel>
            <div className="py-2 text-center text-sm text-muted-foreground max-w-7xl mx-auto">
                {/* {images[current].prose} */}

                <StoryCarouselItemDetail image={images[current]} />
            </div>
        </div>
    )
}


export function StoryCarouselItemDetail({ image }: { image: ImageMetadata }) {
    const { fileName, year, category, subCategory, tags, prose } = image
    const { push } = useRouter()
    return (
        <div className="grid gap-4 md:gap-10 py-4">
            <div className="grid gap-2">
                <TypographyTitle>{fileName}</TypographyTitle>
                {/* <h1 className="text-3xl font-bold capitalize">{fileName}</h1> */}
                <p className="text-muted-foreground">{year}</p>
                <TypographyP>{prose}</TypographyP>
            </div>
            <div className="grid gap-2">
                <div className="flex space-x-2 items-center mx-auto">
                    <Badge
                        variant={"default"}
                        onClick={() => push(`/library/${category}`)}
                        className='cursor-pointer capitalize py-2 w-fit'
                    >
                        {category ? category : "Uncategorized"}
                    </Badge>
                    <Badge
                        variant={"secondary"}
                        onClick={() => push(`/library/${category}/${subCategory}`)}
                        className='cursor-pointer capitalize py-2 w-fit'
                    >
                        {subCategory ? subCategory : "Uncategorized"}
                    </Badge>
                    {Array.isArray(tags) &&
                        <div>
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
        </div>
    )
}

