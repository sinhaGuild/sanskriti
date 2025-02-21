import { motion, useScroll, useTransform } from 'framer-motion';
import Image, { StaticImageData } from 'next/image';
import { useRef } from 'react';

export default function ZoomParallax({ images }: { images: StaticImageData[] }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end'],
    });


    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const scale = [scale4, scale5, scale6, scale5, scale6, scale8, scale9]

    const pictures = images.map((im, idx) => (
        {
            src: im,
            scale: scale[idx]
        }
    ))

    // const pictures = [
    //     {
    //         src: Picture1,
    //         scale: scale4,
    //     },
    //     {
    //         src: Picture2,
    //         scale: scale5,
    //     },
    //     {
    //         src: Picture3,
    //         scale: scale6,
    //     },
    //     {
    //         src: Picture4,
    //         scale: scale5,
    //     },
    //     {
    //         src: Picture5,
    //         scale: scale6,
    //     },
    //     {
    //         src: Picture6,
    //         scale: scale8,
    //     },
    //     {
    //         src: Picture7,
    //         scale: scale9,
    //     },
    // ];

    return (
        <div ref={container} className="h-[300vh] relative">
            <div className="sticky top-0 h-[100vh] overflow-hidden">
                {pictures.map(({ src, scale }, index) => {
                    const imageContainerClasses = "relative";
                    let widthClass = "w-[25vw] h-[25vh]"; // Default for nth-of-type(1)

                    // Adjust classes based on index
                    switch (index) {
                        case 1:
                            widthClass = "w-[35vw] h-[30vh] top-[-30vh] left-[5vw]";
                            break;
                        case 2:
                            widthClass = "w-[20vw] h-[45vh] top-[-10vh] left-[-25vw]";
                            break;
                        case 3:
                            widthClass = "w-[25vw] h-[25vh] left-[27.5vw]";
                            break;
                        case 4:
                            widthClass = "w-[20vw] h-[25vh] top-[27.5vh] left-[5vw]";
                            break;
                        case 5:
                            widthClass = "w-[30vw] h-[25vh] top-[27.5vh] left-[-22.5vw]";
                            break;
                        case 6:
                            widthClass = "w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]";
                            break;
                        default:
                            break;
                    }
                    return (
                        <motion.div
                            key={index}
                            style={{ scale }}
                            className="w-full h-full absolute top-0 flex items-center justify-center"
                        >
                            {/* <div className="relative w-[25vw] h-[25vh]"> */}
                            <div className={`${imageContainerClasses} ${widthClass}`}>
                                <Image
                                    src={src}
                                    fill
                                    alt="image"
                                    placeholder="blur"
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}