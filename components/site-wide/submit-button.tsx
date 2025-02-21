'use client'
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SendHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JSX } from "react";


type SubmitButtonProps = {
    loading: boolean
    className?: string
    btnTitle?: string
    loadingTitle?: string
    icon?: JSX.Element | React.ReactNode | string;
};

export function SubmitButton({ loading, className, btnTitle = "Submit", loadingTitle = "Generating..", icon = <SendHorizontal className="ml-4" />
}: SubmitButtonProps) {
    return (
        <>
            {loading && (
                <div className="flex justify-end">
                    <Button disabled className={cn(
                        "w-1/2",
                        className
                    )}>
                        <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                        {loadingTitle}
                    </Button>
                </div>
            )}

            {!loading && (
                <div className="flex justify-end">
                    <Button type="submit" className={cn(
                        "w-1/2 h-10",
                        className
                    )}>
                        {btnTitle}
                        {icon}
                    </Button>
                </div>
            )}
        </>
    );
}

