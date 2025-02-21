'use client'
import { cn } from "@/lib/utils";
import {useSanskritiStore} from "@/store/store-provider";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SendHorizontal } from "lucide-react";
import { JSX } from "react";
import { Button } from "@/components/ui/button";


type SubmitButtonProps = {
    loading: boolean
    className?: string
    btnTitle?: string
    loadingTitle?: string
    icon?: JSX.Element | React.ReactNode | string;
    onClick: () => Promise<void>
};

export function UploadButton({ loading, className, btnTitle = "Submit", loadingTitle = "Generating..", icon = <SendHorizontal className="ml-4" />, onClick
}: SubmitButtonProps) {

    const { currentUser } = useSanskritiStore((state) => state)

    return (
        <>
            {loading && (
                <div className="flex justify-end">
                    <Button disabled onClick={onClick} className={cn(
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
                    <Button
                        onClick={onClick}
                        className={cn(
                            "w-1/2 h-10",
                            className
                        )}
                        disabled={currentUser.credits <= 0}
                    >
                        {btnTitle}
                        {icon}
                    </Button>
                </div>
            )}
        </>
    );
}

