import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { getListOfPathnames } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { PropsWithChildren } from "react"
import SwitchColorizer from "../colorize-switch"
import { AppSidebar } from "./app-sidebar"

export default function SidebarContainer(props: PropsWithChildren) {
    const pathName = usePathname()
    const pathIsNotHome = pathName !== "/" && getListOfPathnames(pathName).length > 0
    return (
        <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <SidebarInset>
                <div className="flex sticky top-0 z-50 border-b bg-transparent backdrop-blur-sm items-center text-slate-600 dark:text-slate-300 rounded-t-xl">
                    <header className="flex h-16 shrink-0 gap-2 items-center">
                        <div className="flex h-[--header-height] items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/">
                                            Home
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {pathIsNotHome && getListOfPathnames(pathName).map((path, id) => (
                                        <div key={id} className="flex items-center gap-2">
                                            <BreadcrumbItem>
                                                <BreadcrumbPage>{path}</BreadcrumbPage>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator className="hidden md:block" />
                                        </div>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </header>
                    <SwitchColorizer />
                </div>
                {props.children}
            </SidebarInset>
        </SidebarProvider>
    )
}