import { PropsWithChildren, useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import BackButton from "./back-button"
import { HeadingH2 } from "./typography"


export const AtomicLayout = ({ children }: PropsWithChildren) => {
    return (
        <div className="py-2 md:px-4 px-2">
            <div className="flex flex-col md:flex-row pt-10 pl-4">
                {children}
            </div>
        </div>
    )
}
export const AtomicLayoutLeft = ({ children }: PropsWithChildren) => {
    return (
        <div className="w-full md:w-1/6 px-2 items-center self-start">
            <BackButton />
            {children}
        </div>
    )
}
export const AtomicLayoutLeftWithoutBtn = ({ children }: PropsWithChildren) => {
    return (
        <div className="w-full md:w-1/6 px-2 items-center self-start">
            {children}
        </div>
    )
}
export const AtomicLayoutRight = ({ children }: PropsWithChildren) => {
    return (
        <div className='w-full md:w-4/6'>{children}</div>
    )
}

export const AtomicHeading = ({ title, description }: { title: string, description: string }) => {
    // const [phonetic, setPhonetic] = useState('');
    const [definition, setDefinition] = useState('');

    useEffect(() => {
        const fetchDefinition = async () => {
            if (!title) return;

            try {
                const response = await fetch(`/api/openai/category?categoryName=${title}`);
                // const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${title}`);
                if (!response.ok) {
                    throw new Error('Word not found');
                }
                const data = await response.json();

                // Extract phonetic and first definition
                // const phoneticText = 'No phonetic available';
                const definition = data?.description || description;
                // const phoneticText = data[0]?.phonetic || 'No phonetic available';
                // const description = data[0]?.meanings[0]?.definitions[0]?.definition || 'No definition available';

                // setPhonetic(phoneticText);
                setDefinition(definition);
            } catch (err) {
                // setPhonetic('');
                console.error(`Fetching category failed with error ${err}`)
                setDefinition('');
            }
        };

        fetchDefinition();
    }, [title]);

    return (
        <div className="flex flex-col gap-2">
            <HeadingH2>{title}</HeadingH2>
            {/* <div className="text-7xl py-4 capitalize">
                {title}
            </div> */}
            <Separator className="mb-4" />
            {/* <p className="text-muted-foreground text-sm">{phonetic}</p>
            <p className="text-pretty">{definition}</p> */}
            {/* {phonetic && <p className="text-muted-foreground text-sm">{phonetic}</p>} */}
            {definition && <p className="text-justify">{definition}</p>}
        </div>
    )
}


export const AtomicDescriptionSample = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis obcaecati architecto ut accusamus dicta autem fugiat blanditiis magni recusandae? Rem doloribus soluta, beatae nam quod id voluptates alias itaque enim?"