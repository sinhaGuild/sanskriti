"use client"
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const { back } = useRouter()
    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn(
                "rounded-none bg-transparent hover:bg-muted [&_svg]:w-[3rem] [&_svg]:h-[3rem]",
                " border-slate-500"
            )}
            aria-label="Playground"
            onClick={() => back()}
        ><CircleArrowLeft /></Button>
    )
}