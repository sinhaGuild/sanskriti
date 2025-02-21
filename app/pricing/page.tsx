"use client"
import { useEffect, useState } from "react";


import { PricingCard, SubscriptionCard } from "@/components/PricingCards";
import { ExchangeRates } from "@/components/site-wide/exchange-rates";
import { PricingTiers, PricingTiersSubscription } from "@/components/site-wide/site-config";
import { HeadingH2 } from "@/components/site-wide/typography";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useSanskritiStore } from "@/store/store-provider";
import { v4 } from 'uuid';


export default function PricingPage() {
    const [isSubscription, setisSubscription] = useState(false);
    const [counter, setCounter] = useState(10);
    const { currency, setCurrency, exchangeRate, setExchangeRate } = useSanskritiStore((state) => state)

    useEffect(() => {

        async function fetchExchangeRate() {
            const res = await fetch(`https://v6.exchangerate-api.com/v6/9dfb285d42b2b025478f4758/pair/usd/${currency}`)
            const data = await res.json()
            // console.log(JSON.stringify(data))
            if (data.conversion_rate) {
                setExchangeRate(data.conversion_rate)
            } else {
                setExchangeRate(null)
            }
        }

        fetchExchangeRate()

        toast({
            title: `Currency changed to ${currency}`,
            description: `Conversion Rate: ${exchangeRate ? exchangeRate : "Exchange not supported."}`
        })
        // console.log(exchangeRate)
    }, [currency])

    return (
        <section className="py-32">
            <div className="container">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                    <HeadingH2>
                        Purchase Credits
                    </HeadingH2>
                    <p className="text-muted-foreground lg:text-xl">
                        Affordable plans for every need.
                    </p>
                    <div className="">
                        <Select
                            onValueChange={(value) => setCurrency(value)}
                        >
                            <SelectTrigger className="w-[180px] min-h-fit bg-black text-white dark:bg-white dark:text-black">
                                <SelectValue placeholder="Change Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Currency</SelectLabel>
                                    {ExchangeRates.map((ex, idx) => (
                                        <SelectItem key={idx} value={ex}>{ex}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                        Packages
                        <Switch
                            onCheckedChange={() => setisSubscription(!isSubscription)}
                            checked={isSubscription}
                        />
                        A-la-carte
                    </div>
                    <div className="flex flex-col items-stretch gap-6 md:flex-row">
                        {!isSubscription && PricingTiers.map((tier) => (
                            <PricingCard
                                key={v4()}
                                isSubcription={false}
                                {...tier}
                            />
                        ))}
                        {isSubscription &&
                            <SubscriptionCard
                                key={v4()}
                                planTitle={PricingTiersSubscription[0].planTitle}
                                numOfCredits={counter}
                                planDescription={PricingTiersSubscription[0].planDescription}
                                model={PricingTiersSubscription[0].model}
                                storageTerm={PricingTiersSubscription[0].storageTerm}
                                pricePerCredit={PricingTiersSubscription[0].pricePerCredit}
                                setCounter={setCounter}

                            />}
                    </div>
                </div>
            </div>
            
        </section>
    );
};

