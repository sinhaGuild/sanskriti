"use client"


import { Button } from "@/components/ui/button"
import {
    SidebarMenu,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { useSanskritiStore } from "@/store/store-provider"
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { Coins } from "lucide-react"
import { useEffect } from "react"

export function NavUser() {

    const { currentUser, getOrCreateUser } = useSanskritiStore((state) => state)
    const { user } = useUser()

    useEffect(() => {
        if (user) {
            const fetchUser = async () => await getOrCreateUser(user?.id)
            fetchUser().catch(console.error)
        }
    }, [user])

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <div className="flex ml-auto space-x-4 pr-4">
                    <div className="rounded-md">
                        <SignedOut>
                            <SignInButton><Button variant={"outline"}>Sign In</Button></SignInButton>
                        </SignedOut>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto gap-1.5 text-sm"
                    >
                        <Coins className="size-3.5 text-yellow-400" />
                        {currentUser.credits ? currentUser.credits : 0}
                    </Button>
                </div>

            </SidebarMenuItem>
        </SidebarMenu>
    )
}
