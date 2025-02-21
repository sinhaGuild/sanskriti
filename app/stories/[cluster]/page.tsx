"use client"

import { HeadingH1 } from "@/components/site-wide/typography";
import { StoryCarousel } from "@/components/StoryCarousel";
import { Separator } from "@/components/ui/separator";
import { useSanskritiStore } from "@/store/store-provider";
import { use } from "react";

export default function ClusterDetailPage({ params }: { params: Promise<{ cluster: number }> }) {
    const { cluster } = use(params)
    const { images, shouldColorize } = useSanskritiStore((state) => state);

    const findCluster = (cluster: number) => {
        return images.find(image => image.cluster == cluster)
    }

    const image = findCluster(cluster)
    const filteredClusters = images.filter(item => item.cluster == cluster)

    return (
        <div className="container max-w-screen-2xl">
            {image && <div className="space-y-4 text-center">
                <div className="lg:text-8xl text-7xl font-bold font-hindi text-orange-500">{cluster}.</div>
                <Separator className="w-[90%]" />
                <HeadingH1>{image.story_heading}</HeadingH1>
                <div className="lg:text-2xl text-lg">{image.story_description}</div>
                {filteredClusters.length > 0 && <StoryCarousel images={filteredClusters} shouldColorize={shouldColorize} />}
                <div className="h-screen"></div>
            </div>}
        </div>
    )
}