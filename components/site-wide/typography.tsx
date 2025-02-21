import { cn } from "@/lib/utils"
import { PropsWithChildren } from "react"

interface TypographyProps extends PropsWithChildren {
    className?: string
}

export const HeadingH1 = (props: TypographyProps) => {
    return (
        <div className={cn(
            "relative inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-6xl sm:leading-tight md:text-8xl md:leading-tight",
            props.className
        )}>{props.children}</div>
    )
}

export const HeadingH2 = (props: TypographyProps) => {
    return (
        <div className={cn(
            "relative inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text font-semibold leading-tight text-transparent drop-shadow-2xl text-5xl sm:leading-tight md:text-6xl md:leading-tight capitalize",
            props.className
        )}>{props.children}</div>
    )
}

export const TypographyTitle = (props: TypographyProps) => {
    return (
        <div className={cn(
            "relative inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text font-semibold leading-tight text-transparent drop-shadow-2xl text-2xl sm:leading-tight md:text-3xl md:leading-tight capitalize",
            props.className
        )}>{props.children}</div>
    )
}

export function TypographyP(props: TypographyProps) {
    return (
        <p className="leading-7 [&:not(:first-child)]:mt-6">
            {props.children}
        </p>
    )
}
