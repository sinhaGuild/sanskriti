import { cn } from '@/lib/utils';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface CharacterParallaxProps {
    paragraph: string
    variant?: "left" | "right"

}

export default function CharacterParallax({ paragraph, variant = "left" }: CharacterParallaxProps) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start 0.9', 'start 0.25'],
    });

    const words = paragraph.split(' ');
    return (
        <p ref={container} className={cn(
            "flex text-[60px] leading-none p-[40px] max-w-[1280px] dark:text-white text-black flex-wrap",
            variant == "right" ? "justify-end justify-self-end" : ""
        )}>
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
    const amount = range[1] - range[0];
    const step = amount / children.length;
    return (
        <span className="relative mr-[12px] mt-[12px] inline-block font-serif font-bold">
            {children.split('').map((char, i) => {
                const start = range[0] + i * step;
                const end = range[0] + (i + 1) * step;
                return (
                    <Char key={`c_${i}`} progress={progress} range={[start, end]}>
                        {char}
                    </Char>
                );
            })}
        </span>
    );
};

const Char = ({ children, progress, range }: { children: string, progress: MotionValue<number>, range: number[] }) => {
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span>
            <span className="absolute opacity-20">{children}</span>
            <motion.span style={{ opacity: opacity }}>{children}</motion.span>
        </span>
    );
};