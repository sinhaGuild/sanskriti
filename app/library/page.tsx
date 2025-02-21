"use client"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleSkeleton } from "@/components/ui/skeleton/json-skeleton";
import { useSanskritiStore } from "@/store/store-provider";
import { Calendar, Cat, PersonStanding, Pyramid, ShieldQuestion, Shirt, Swords, TentTree } from "lucide-react";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { v4 } from 'uuid';

export default function LibraryPage() {
    const { images, isFirebaseLoading } = useSanskritiStore((state) => state);

    // unique categories
    const uniqueCategories = [...new Set(images.map(item => item.category).filter(category => category !== null))].sort()

    // unique sub categories
    const uniqueSubCategories = [...new Set(images.map(item => item.subCategory).filter(subCategory => subCategory !== null))].sort()

    //unique tags
    const allTags = images.flatMap(image => image.tags)
    const uniqueTags = [...new Set(allTags)].sort()


    // unique years
    const uniqueYears = [...new Set(images.map(item => item.year).filter(year => year !== null))]

    //find category with subcategory
    function getCategory(subCategory: string) {
        const image = images.find(item => item.subCategory === subCategory)
        return image?.category
    }

    // console.log(uniqueCategories)
    // const setImages = useImageStore((state) => state.setImages);

    return (
        <main className="pl-2">
            <div className="text-4xl font-bold capitalize pt-6 px-4">Categories</div>
            {isFirebaseLoading && <SimpleSkeleton />}
            <div className="flex space-x-4 items-center sm:items-start py-8 px-4 max-w-5xl cursor-pointer ml-4">
                {uniqueCategories.map((categoryName) => (
                    <div key={v4()}>
                        <CategoryCard categoryName={categoryName} />
                    </div>
                ))}
            </div>
            <div className="text-4xl font-bold capitalize pt-6 px-4">Sub Categories</div>
            {isFirebaseLoading && <SimpleSkeleton />}
            <CategoryListContainer>
                {uniqueSubCategories.map((subCategoryName) => (
                    <div key={v4()}> <CategoryBadge
                        categoryName={subCategoryName}
                        type="subCategory"
                        path={`/library/${getCategory(subCategoryName)}/${subCategoryName}`}
                    /></div>
                ))}
            </CategoryListContainer>
            <div className="text-4xl font-bold capitalize pt-6 px-4">Years</div>
            {isFirebaseLoading && <SimpleSkeleton />}
            <CategoryListContainer>

                {uniqueYears.map((year) => (
                    <div key={v4()}> <CategoryBadge
                        categoryName={year.toString()}
                        type="years"
                        path={`/library/year/${year.toString()}`}
                    /></div>
                ))}
            </CategoryListContainer>
            <div className="text-4xl font-bold capitalize pt-6 px-4">Tags</div>
            {isFirebaseLoading && <SimpleSkeleton />}
            <CategoryListContainer>

                {uniqueTags.map((tag) => (
                    <div key={v4()}> <CategoryBadge
                        categoryName={tag}
                        type="tags"
                        path={`/library/tag/${tag}`}
                    /></div>
                ))}
            </CategoryListContainer>
        </main>

    );
}


function CategoryBadge({ categoryName, type, path }: { categoryName: string, type: string, path?: string }) {
    const { push } = useRouter()
    return (

        <Badge
            variant={type == "subCategory" ? "default" : type === "years" ? "secondary" : "outline"}
            onClick={() => push(path ? path : "#")}
            className='capitalize py-2 w-fit'
        >
            {categoryName ? categoryName : "Uncategorized"}
        </Badge>
    )
}

interface CategoryCardType {
    icon: React.ReactNode
    categoryName: string
}

function CategoryCard({ categoryName }: { categoryName: string }) {
    const { push } = useRouter()

    const config = CategoryCardsConfig.find(el => el.categoryName === categoryName)

    return (
        <>
            <Card className="w-fit cursor-pointer" onClick={() => push(`/library/${categoryName}`)} >
                <CardHeader>
                    <CardTitle>{config?.icon}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col space-y-1.5">
                        <p className="text-4xl capitalize">{categoryName ? categoryName : "Uncategorized"}</p>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}


const CategoryCardsConfig: CategoryCardType[] = [
    {
        icon: <PersonStanding />,
        categoryName: "People"
    },
    {
        icon: <Pyramid />,
        categoryName: "Structures"
    },
    {
        icon: <Cat />,
        categoryName: "Animals"
    },
    {
        icon: <ShieldQuestion />,
        categoryName: "Uncategorized"
    },
    {
        icon: <Calendar />,
        categoryName: "Events"
    },
    {
        icon: <TentTree />,
        categoryName: "Nature"
    },
    {
        icon: <Swords />,
        categoryName: "Activities"
    },
    {
        icon: <Shirt />,
        categoryName: "Objects"
    }
]


const CategoryListContainer = (props: PropsWithChildren) => {
    return (
        <div className="flex flex-wrap space-x-4 space-y-4 items-center py-8 px-4 max-w-[calc(100%-500px)] cursor-pointer [&>*:first-child]:mt-4 [&>*:first-child]:ml-4">
            {props.children}
        </div>
    )
}