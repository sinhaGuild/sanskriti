import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
];

export default function SmoothScrollParallax({ dimension }: { dimension: { width: number, height: number } }) {
    const gallery = useRef(null);
    // const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ['start end', 'end start'],
    });
    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

    return (
        <main>
            <div className="h-[100vh]"></div>
            <div ref={gallery} className="h-[175vh] bg-[#2d2d2d] relative flex gap-[2vw] p-[2vw] box-border overflow-hidden">
                <Column images={[images[0], images[1], images[2]]} y={y} style={{ top: '-45%' }} />
                <Column images={[images[3], images[4], images[5]]} y={y2} style={{ top: '-95%' }} />
                <Column images={[images[6], images[7], images[8]]} y={y3} style={{ top: '-45%' }} />
                <Column images={[images[9], images[10], images[11]]} y={y4} style={{ top: '-75%' }} />
            </div>
            <div className="h-[100vh]"></div>
        </main>
    );
}

const Column = ({ images, y, style }: { images: string[], y: MotionValue<number>, style: React.CSSProperties }) => {
    return (
        <motion.div className="relative h-full w-[25%] min-w-[250px] flex flex-col gap-[2vw]" style={{ y, ...style }}>
            {images.map((src: string, i: number) => {
                return (
                    <div key={i} className="h-full w-full relative rounded-[1vw] overflow-hidden">
                        <Image src={`/smooth/${src}`} alt="image" fill className="object-cover" />
                    </div>
                );
            })}
        </motion.div>
    );
};