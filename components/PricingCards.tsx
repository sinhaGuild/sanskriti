import { useSanskritiStore } from "@/store/store-provider"
import { useUser } from "@clerk/nextjs"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { ArrowRight, CircleCheck } from "lucide-react"
import { Dispatch, SetStateAction } from "react"
import CreditCounter from "./CreditCounter"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"


export interface PricingCardInterface {
    planDescription: string
    model: string
    storageTerm: number
    pricePerCredit: number
    numOfCredits: number
    isSubcription: boolean
    planTitle: string | null
    setCounter?: Dispatch<SetStateAction<number>>
}

export const PricingCard = ({ planDescription, model, storageTerm, pricePerCredit, numOfCredits, isSubcription, planTitle }: PricingCardInterface) => {

    const { currency, exchangeRate } = useSanskritiStore((state) => state)

    const { user } = useUser()

    const handleCheckout = async () => {
        // const stripe = await stripePromise;

        const response = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, pricePerCredit, numOfCredits }),
            // body: JSON.stringify({ userId: user?.id, email:user?.primaryEmailAddress?.emailAddress ,pricePerCredit, numOfCredits }),
        });

        const session = await response.json();

        if (session.url) {
            // Redirect to Stripe Checkout
            window.location.href = session.url;
        } else {
            console.error(session.error);
        }
    };

    return (
        <Card className="flex w-80 flex-col justify-between text-left">
            <CardHeader>
                <CardTitle>
                    <p>{isSubcription ? planTitle : `${Math.round(numOfCredits)} Credits`}</p>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    {planDescription}
                </p>
                <span className="text-4xl font-bold">
                    {`${currency} ${(Math.round(numOfCredits * pricePerCredit * exchangeRate!) / 100).toLocaleString()}`}
                </span>
            </CardHeader>
            <CardContent>
                <Separator className="mb-6" />
                <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`${(numOfCredits)} generations.`}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`${currency} ${(pricePerCredit * 0.01 * exchangeRate!).toFixed(2)}`} per credit</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`${model} tokens Model.`}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`Storage for ${storageTerm} months.`}</span>
                    </li>
                </ul>
            </CardContent>
            <CardFooter className="mt-auto">
                <Button className="w-full" onClick={handleCheckout}>
                    Get Credits
                    <ArrowRight className="ml-2 size-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}

export interface SubscriptionCardInterface {
    planDescription: string
    model: string
    storageTerm: number
    pricePerCredit: number
    numOfCredits: number
    planTitle: string | null
    setCounter: Dispatch<SetStateAction<number>>
}

export const SubscriptionCard = ({ planDescription, model, storageTerm, pricePerCredit, numOfCredits, setCounter, planTitle }: SubscriptionCardInterface) => {

    const { currency, exchangeRate } = useSanskritiStore((state) => state)

    const { user } = useUser()

    const handleCheckout = async () => {
        // const stripe = await stripePromise;

        const response = await fetch('/api/stripe/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user, pricePerCredit, numOfCredits }),
            // body: JSON.stringify({ userId: user?.id, email:user?.primaryEmailAddress?.emailAddress ,pricePerCredit, numOfCredits }),
        });

        const session = await response.json();

        if (session.url) {
            // Redirect to Stripe Checkout
            window.location.href = session.url;
        } else {
            console.error(session.error);
        }
    };

    return (
        <Card className="flex w-80 flex-col justify-between text-left">
            <CardHeader>
                <CardTitle>
                    <p>{planTitle}</p>
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                    {planDescription}
                </p>
                <span className="text-4xl font-bold">
                    {`${currency} ${(Math.round(numOfCredits * pricePerCredit * exchangeRate!) / 100).toLocaleString()}`}
                </span>




            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`${(numOfCredits)} generations.`}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`${currency} ${(pricePerCredit * 0.01 * exchangeRate!).toFixed(2)}`} per credit</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`${model} tokens Model.`}</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <CircleCheck className="size-4" />
                        <span>{`Storage for ${storageTerm} months.`}</span>
                    </li>
                </ul>
            </CardContent>
            <Separator className="h-0.5 mt-2 w-full self-center bg-slate-200 mb-4" />
            <CardFooter className="mt-auto flex flex-col gap-4">
                <CreditCounter counter={numOfCredits} setCounter={setCounter} />
                <Button className="w-full" onClick={handleCheckout}>
                    Get Credits
                    <ArrowRight className="ml-2 size-4" />
                </Button>
            </CardFooter>
        </Card>
    )
}

