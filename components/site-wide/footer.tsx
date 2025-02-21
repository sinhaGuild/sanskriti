"use client"

import { pageTitleMapping } from '@/components/site-wide/site-config'
import Link from 'next/link'

export default function Footer() {
    return (
        <>
            <div className='h-[30vh]'></div>
            <div className="mt-[10vh] m-10">
                <div className='bg-slate-700 text-slate-300 dark:text-slate-700 dark:bg-slate-300 py-8 px-12 h-full w-full flex flex-col justify-between rounded-3xl'>
                    <Section1 />
                    <Section2 />
                </div>
            </div>
        </>
    )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )

}

const Section2 = () => {
    return (
        <div className='flex justify-between items-end'>
            <h1 className='text-[12vw] leading-[0.8] my-10 text-white dark:text-black tracking-widest'>SANSKRITI</h1>
            <div className='flex gap-2'>
                <p>©copyright</p>
                <a className='italic' href='https://github.com/sinhaGuild'>pikaso</a>
            </div>
        </div>
    )

}

const Nav = () => {
    const splitter = Math.ceil(pageTitleMapping.length / 2)

    return (
        <div className='flex shrink-0 gap-20 text-muted'>
            <div className='flex flex-col gap-2 my-4 text-slate-400'>
                {pageTitleMapping.slice(0, splitter).map((item, idx) => (
                    <Link href={item.route} key={idx}>{item.title}</Link>
                ))}
            </div>
            <div className='flex flex-col gap-2 my-4 text-slate-400'>
                {pageTitleMapping.slice(splitter).map((item, idx) => (
                    <Link href={item.route} key={idx}>{item.title}</Link>
                ))}

            </div>
        </div>

    )
}