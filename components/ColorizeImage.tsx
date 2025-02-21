"use client"
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useRouter } from 'next/navigation';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import { v4 } from 'uuid';
import {useSanskritiStore} from "@/store/store-provider";
import { Badge } from './ui/badge';
import { JSONSkeleton } from './ui/skeleton/json-skeleton';



const ColorizeImage = () => {
    const { latestImage, colorizationInProgress } = useSanskritiStore((state) => state);
    // const setImages = useImageStore((state) => state.setImages);
    const { fileName, description, prose, url, transformedImageUrl, category, subCategory, tags, year } = latestImage

    const { push } = useRouter()

    return (

        <div className="">
            {!colorizationInProgress &&
                <ScrollArea className="h-[90vh] w-full rounded-lg p-4">
                    <>
                        <ReactBeforeSliderComponent
                            secondImage={{ imageUrl: url, alt: description }}
                            firstImage={{ imageUrl: transformedImageUrl, alt: description }}
                            className='rounded-lg'
                        />
                        {/* <Compare
                            className="h-[250px] w-[200px] md:h-[500px] md:w-[500px] mx-auto"
                            firstImage={transformedImageUrl}
                            secondImage={url}
                        /> */}
                        <div className="grid gap-4 md:gap-10 py-4">
                            <div className="grid gap-2">
                                <h1 className="text-3xl font-bold capitalize">{fileName}</h1>
                                <p className="text-muted-foreground">{year}</p>
                                <p className="text-muted-foreground">{description}</p>
                                <br />
                                <p className="text-muted-foreground">{prose}</p>
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
                    </>
                </ScrollArea>
            }
            {colorizationInProgress && <JSONSkeleton />}
        </div>
    );
};


export default ColorizeImage;