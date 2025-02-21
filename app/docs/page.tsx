"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import Link from "next/link";
import { faqs } from '../../components/site-wide/site-prose';

const Faq5 = () => {
    return (
        <div className="">
            <section className="py-32">
                <div className="container max-w-screen-xl">
                    <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">
                        Frequently asked questions
                    </h1>
                    {faqs.map((faq, index) => (
                        <Accordion key={index} type="single" collapsible>
                            <AccordionItem value={`item-${index}`}>
                                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>{faq.answer}</AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    ))}
                </div>
            </section>

            <Separator className='container max-w-screen-lg' />

            <section className="py-32">
                <div className="container max-w-screen-xl">
                    <div className="mb-14">
                        <span className="text-sm font-semibold">Reach Us</span>
                        <h1 className="mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl">
                            Speak to us about your requirements
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            We&apos;d love to assist you. Drop us an email.
                        </p>
                    </div>
                    <div className="grid gap-10 md:grid-cols-3">
                        <div>
                            <span className="mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent">
                                <Mail className="h-6 w-auto" />
                            </span>
                            <p className="mb-2 text-lg font-semibold">Email Us</p>
                            <p className="mb-3 text-muted-foreground">
                                Our team is ready to assist.
                            </p>
                            {/* <a href="#" className="font-semibold hover:underline">
                                shunyasea@gmail.com
                            </a> */}
                            <Link
                                href="#"
                                onClick={(e) => {
                                    window.location.href = "mailto:shunyasea@gmail.com"
                                    e.preventDefault()
                                }}
                                className="font-semibold hover:underline"
                            >
                                shunyasea@gmail.com
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default Faq5;
