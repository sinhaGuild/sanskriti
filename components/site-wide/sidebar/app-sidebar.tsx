"use client"

import * as React from "react"

import { NavMain } from "./nav-main"
// import { NavProjects } from "./nav-projects"
import { Label } from "@/components/ui/label"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import pikaso from '@/public/pikaso.svg'
import { useTheme } from "next-themes"
import Image from "next/image"
import Link from "next/link"
import SwitchColorizer from "../colorize-switch"
import { NavProjects } from "./nav-projects"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import { sidebarConfig } from "./sidebar-data"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { setTheme, theme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <Sidebar variant="inset" {...props} >
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/">
                                <div className="flex aspect-square size-7 items-center justify-center rounded-lg">
                                    <Image
                                        src={pikaso}
                                        alt="site logo"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Sansriti</span>
                                    <span className="truncate text-xs">by Pikaso</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarConfig.navMain} />
                <NavProjects projects={sidebarConfig.projects} />
                <NavSecondary items={sidebarConfig.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter className="items-start space-y-2">
                <SwitchColorizer />
                <div className="flex items-center space-x-2">
                    <Switch id="theme-toggle" onCheckedChange={toggleTheme} />
                    <Label htmlFor="theme-toggle" className="font-normal text-xs">Toggle Theme</Label>
                </div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}
