import { features, values } from '@/components/site-wide/site-prose'
import { Separator } from '@/components/ui/separator'

const AboutUsPage = () => {
    return (
        <>
            <section className="py-32">
                <div className="container mx-auto max-w-screen-xl">
                    <p className="mb-4 text-xs text-muted-foreground md:pl-5">Features</p>
                    <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
                        Our Core Features
                    </h2>
                    <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
                        {features.map((feature, idx) => (
                            <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
                                <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                                    {feature.icon}
                                </span>
                                <div>
                                    <h3 className="font-medium md:mb-2 md:text-xl">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground md:text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Separator className='container max-w-screen-lg' />
            <section className="py-32">
                <div className="container max-w-screen-xl">
                    <div className="grid gap-8 lg:grid-cols-3">
                        <h2 className="row-span-3 text-3xl font-semibold lg:text-5xl">
                            Our Values and Principles
                        </h2>

                        {values.map(({ title, content }, idx) => (
                            <div key={idx} className='my-2'>
                                <h3 className="mb-2 text-xl font-medium">{title}</h3>
                                <p className="text-muted-foreground">
                                    {content}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>
            </section>

        </>
    )
}

export default AboutUsPage