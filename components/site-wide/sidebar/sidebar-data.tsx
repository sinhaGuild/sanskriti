import { Book, DollarSign, Images, LibrarySquare, LifeBuoy, Origami } from "lucide-react";

export const sidebarConfig = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Colorize Images",
            url: "#",
            icon: Images,
            isActive: true,
            items: [
                {
                    title: "Colorize",
                    url: "/upload",
                },
                {
                    title: "Archive",
                    url: "/archive",
                },
                // {
                //     title: "Settings",
                //     url: "#",
                // },
            ],
        },
        // {
        //     title: "Explore",
        //     url: "#",
        //     icon: Telescope,
        //     isActive: false,
        //     items: [
        //         {
        //             title: "Library",
        //             url: "/library",
        //         },
        //         {
        //             title: "Gallery",
        //             url: "/gallery",
        //         },
        //         {
        //             title: "Stories",
        //             url: "/stories",
        //         },
        //     ],
        // },
        // {
        //     title: "Documentation",
        //     url: "#",
        //     icon: BookOpen,
        //     isActive: false,
        //     items: [
        //         {
        //             title: "About us",
        //             url: "/about",
        //         },
        //         {
        //             title: "Buy Credits",
        //             url: "/pricing",
        //         },
        //         {
        //             title: "FAQs",
        //             url: "/docs",
        //         },
        //     ],
        // },
        // {
        //     title: "Settings",
        //     url: "#",
        //     icon: Settings2,
        //     items: [
        //         {
        //             title: "General",
        //             url: "#",
        //         },
        //         {
        //             title: "Team",
        //             url: "#",
        //         },
        //         {
        //             title: "Billing",
        //             url: "#",
        //         },
        //         {
        //             title: "Limits",
        //             url: "#",
        //         },
        //     ],
        // },
    ],
    navSecondary: [
        {
            title: "About us",
            url: "/about",
            icon: Origami
        },
        {
            title: "Buy Credits",
            url: "/pricing",
            icon: DollarSign
        },
        {
            title: "FAQs",
            url: "/docs",
            icon: LifeBuoy
        },
    ],
    projects: [
        {
            name: "Gallery",
            url: "/gallery",
            icon: Images,
        },
        {
            name: "Tag Library",
            url: "/library",
            icon: LibrarySquare,
        },
        {
            name: "Stories",
            url: "/stories",
            icon: Book,
        },
        // {
        //     name: "About us",
        //     url: "/about",
        //     icon: Origami
        // },
        // {
        //     name: "Buy Credits",
        //     url: "/pricing",
        //     icon: DollarSign
        // },
        // {
        //     name: "FAQs",
        //     url: "/docs",
        //     icon: LifeBuoy
        // },
    ],
}