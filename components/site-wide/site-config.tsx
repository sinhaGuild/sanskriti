import {
    Book,
    DollarSign,
    Images,
    ImageUp,
    LibrarySquare,
    LifeBuoy,
    Origami
} from "lucide-react";
import { JSX } from "react";


export type SiteConfigType = {
    icon: JSX.Element | React.ReactNode | string;
    href: string
    title: string
}

const styles = "size-5"

export const SiteConfig: SiteConfigType[] = [
    // {
    //     icon: <ImageUp className={styles} />,
    //     href: '/upload',
    //     title: 'Colorize Image'
    // },
    {
        icon: <LibrarySquare className={styles} />,
        href: '/library',
        title: 'Library'
    },
    {
        icon: <Images className={styles} />,
        href: '/gallery',
        title: 'Gallery'
    },
    {
        icon: <Book className={styles} />,
        href: '/stories',
        title: 'Stories'
    },
]


const dropDownStyles = "size-5 mr-2"

export const DropdownMenuConfig: SiteConfigType[] = [
    {
        icon: <ImageUp className={dropDownStyles} />,
        href: '/upload',
        title: 'Colorize Image'
    },
    {
        icon: <Images className={dropDownStyles} />,
        href: '/archive',
        title: 'Previous Generations'
    },
]


export const FooterConfig: SiteConfigType[] = [
    {
        icon: <Origami className={styles} />,
        href: '/about',
        title: 'About us'
    },
    {
        icon: <DollarSign className={styles} />,
        href: '/pricing',
        title: 'Buy Credits'
    },
    {
        icon: <LifeBuoy className={styles} />,
        href: '/docs',
        title: 'Documentation'
    },
    // {
    //     icon: <SquareUser className={styles} />,
    //     href: '/account',
    //     title: 'Account'
    // },
]


type PageTitleMap = {
    route: string
    title: string
}

export const pageTitleMapping: PageTitleMap[] = [
    {
        route: "/",
        title: "Home"
    },
    {
        route: "/upload",
        title: "Colorize Images"
    },
    {
        route: "/gallery",
        title: "All Generations"
    },
    {
        route: "/library",
        title: "Library"
    },
    {
        route: "/docs",
        title: "Documentation"
    },
    {
        route: "/about",
        title: "About us"
    },
    {
        route: "/pricing",
        title: "Buy Credits"
    },
    {
        route: "/archive",
        title: "Previous Generations"
    },
]

export function getPageTitle(pathName: string) {
    const pageTitle = pageTitleMapping.find((elem) => elem.route == pathName)?.title
    // console.log(pageTitle)
    if (pageTitle == "" || pageTitle == undefined) {
        const pathtitle = pathName.replace("%20", ' ').split("/").at(-1)
        return pathtitle
    }
    else
        return pageTitle

}


export const PAGINATION_ITEMS_PER_PAGE = 12


export const getHomePageContent = {
    hero: "Rediscovering our Past Through Colorized Memories",
    sub: "Experience the rich tapestry of 17th to 19th century India, brought to life in vibrant hues",
    hero2: "Journey Through Time with Stunning Visuals of a Bygone Era",
    sub2: "A Glimpse into the Opulence of Historical India",
    sub3: "Reviving the Splendor of a Bygone Era",
    hero4: "Witness the beauty of landscapes, people, and events captured in stunning detail.",
    hero3: "Explore our collection and transform your own cherished photographs into colorful narratives of history.",
    hero5: "Join us in celebrating the legacy of our past and transform your own memories into colorful stories."
}

export const GridHeaderComponent = ({ children }: { children: React.ReactNode }) => {
    return <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-2 w-full container max-w-screen-2xl">{children}</div>
}



export const PricingTiers = [
    {
        planTitle: null,
        numOfCredits: 100,
        planDescription: "For Personal Use",
        model: "7B Color",
        storageTerm: 6,
        pricePerCredit: 6.99
    },
    {
        planTitle: null,
        numOfCredits: 200,
        planDescription: "For Personal Use",
        model: "7B Color",
        storageTerm: 12,
        pricePerCredit: 4.997
    },
    {
        planTitle: null,
        numOfCredits: 500,
        planDescription: "For Professionals",
        model: "14B Color",
        storageTerm: 18,
        pricePerCredit: 4.997
    },
]
export const PricingTiersSubscription = [
    {
        planTitle: "A-la-carte",
        numOfCredits: 250,
        planDescription: "For Personal Use",
        model: "14B Color",
        storageTerm: 12,
        pricePerCredit: 9.997
    }
]
