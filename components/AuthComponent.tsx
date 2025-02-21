"use client"

import { getHomePageContent as gh } from "@/components/site-wide/site-config"
import { PropsWithChildren } from "react"
import { HeadingH1 } from "./site-wide/typography"

// interface AuthComponentInterface {
//     children: React.ReactNode
// }

export default function AuthComponent({ children }: PropsWithChildren) {
    return (
        <div className="fade-bottom overflow-hidden pb-0 sm:pb-0 md:pb-0 bg-background px-4 text-foreground sm:py-24 md:py-32">
            <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
                <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
                    <HeadingH1> {gh.hero}</HeadingH1>
                    <p className="text-md relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 delay-100 sm:text-xl">
                        {gh.hero3}
                    </p>
                    <div className='pb-20 animate-appear-zoom'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}