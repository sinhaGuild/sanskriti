"use client"

import { getListOfPathnames } from "@/lib/utils"
import { useSanskritiStore } from "@/store/store-provider"
import { usePathname } from "next/navigation"
import { Label } from "../ui/label"
import { Switch } from "../ui/switch"

export default function SwitchColorizer() {
    const { shouldColorize, setShouldColorize } = useSanskritiStore((state) => state)
    const pathName = usePathname()

    const pathIsNotHome = pathName !== "/" && getListOfPathnames(pathName).length > 0
    const pathSupportsColorize = pathIsNotHome && !(["/library", "/stories", "/about", "/docs"].indexOf(pathName) > -1)

    return (
        <>
            {pathSupportsColorize &&
                <div className="flex items-center space-x-2">
                    <Switch
                        id="colorize-switch"
                        checked={shouldColorize}
                        onCheckedChange={() => setShouldColorize(!shouldColorize)}
                    />
                    <Label htmlFor="airplane-mode" className="font-normal text-xs">Colorize</Label>
                </div>
            }
        </>
    )

}