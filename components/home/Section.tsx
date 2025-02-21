import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import Background from '../../public/images/1.jpg';

export default function Section({ section }: { section: string }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={container}
            className='relative flex items-center justify-center h-screen overflow-hidden'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between'>
                <p className='w-[50vw] text-[2vw] self-end uppercase mix-blend-difference'>{section}.</p>
                <p className='text-[5vw] uppercase mix-blend-difference '>Sanskriti</p>
            </div>
            <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
                <motion.div style={{ y }} className='relative w-full h-full'>
                    <Image src={Background} fill alt="image" style={{ objectFit: "cover" }} />
                </motion.div>
            </div>
        </div>
    )
}
