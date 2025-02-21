import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function WordParallax({ paragraph }: { paragraph: string }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.9', 'start 0.25'],
    });

    const words = paragraph.split(' ');
    return (
        <p ref={container} className="flex text-[60px] leading-none p-[40px] max-w-[1280px] dark:text-white text-black flex-wrap">
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                    <Word key={i} progress={scrollYProgress} range={[start, end]}>
                        {word}
                    </Word>
                );
            })}
        </p>
    );
}

const Word = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: number[] }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span className="relative mr-[12px] mt-[12px] inline-block font-serif font-bold">
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{ opacity: opacity }}>{children}</motion.span>
        </span>
    );
};