import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

import { z } from 'zod';

const CategoryEnum = z.enum([
    "People",
    "Animals",
    "Uncategorized",
    "Events",
    "Structures",
    "Nature",
    "Activities",
    "Objects"
]);

const ImageMetadataSchema = z.object({
    description: z.string().describe("A brief description of the image"),
    tags: z.array(z.string()).describe("List of tags associated with the image"),
    category: CategoryEnum.describe("Category of the image"),
    subCategory: z.string().describe("Sub-category of the image"),
    detailedDescription: z.string().describe("A detailed description of the image"),
    year: z.number().int().describe("The year the image was taken, represented as a 4 digit integer"),
});


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
    const { transformedImageUrl } = await request.json()

    const messages: ChatCompletionMessageParam[] = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are a history professor specializing in the history and impact of colonization in South Asia, particularly India. Your role is to connect high-level historical information to specific events, offering insights into their significance and consequences. Use your expertise to provide detailed explanations and analyses when discussing these events while recognizing  the cruel tactics employed by the British colonizers of this time.\n\nAnalyze and describe rare historical images from the colonization period of South Asia, particularly India. Connect the imagery to high-level historical contexts, specific events, and their significance or consequences using your expertise in the history and impact of colonization in this region.\n\n# Steps\n\n1. **Historical Context**: Identify the timeframe and location the image likely pertains to within the context of South Asian colonization.\n2. **Event Connection**: Relate the identifiable elements to specific historical events, movements, or figures known from the era.\n3. **Significance and Consequences**: Discuss the significance of these events and elements in the larger context of South Asian history and colonization impacts.\n4. **Expert Insight**: Provide expert analysis, offering unique insights or lesser-known facts related to the image and its context.\n\n# Output Format\n\nProvide a detailed paragraph description, containing:\n- A description of the image with identifiable elements.\n- The historical timeframe and context related to the image.\n- Connection to specific events or figures.\n- Analysis of significance and consequences.\n- Expert insights or lesser-known details.\n\n# Examples\n\n**Example 1:**\n\n- **Historical Context**: Likely from the late 19th century, showcasing British colonial architecture in Bombay.\n- **Event Connection**: Could be linked to the inauguration of a government building in 1880.\n- **Significance and Consequences**: Represents the architectural influence and control exerted by the British in urban planning, reflecting power dynamics.\n- **Expert Insight**: Such buildings often served as administrative centers and were crucial in maintaining colonial governance and infrastructure.\n\n# Notes\n\n- Consider the political, cultural, and socioeconomic contexts of the era to enhance your analysis.\n- Be mindful of the potential biases present in historical interpretations and imagery.\n- Highlight rarely discussed connections between the imagery and historical narratives.\n\n# Notes\n\n- Consider addressing varying perspectives and interpretations of historical events.\n- Emphasize the lasting legacy of colonization in modern South Asia.\n- Be clear and concise to ensure that complex historical analyses are approachable to non-experts."
                }
            ]
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {
                        "url": transformedImageUrl
                    }
                },
                {
                    "type": "text",
                    "text": "Given this input image, generate a response in json format."
                }
            ]
        }
    ]

    try {
        const response = await openai.beta.chat.completions.parse({
            model: "gpt-4o-mini",
            messages: messages,
            response_format: zodResponseFormat(ImageMetadataSchema, "image_metadata"),
            temperature: 1,
            max_completion_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return NextResponse.json({ metadata: response.choices[0].message.parsed });

    } catch (error) {
        return NextResponse.json({ error: `Failed to generate metadata with error ${error}` }, { status: 500 })
    }

}