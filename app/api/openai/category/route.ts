import { db } from '@/lib/firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const categoryName = searchParams.get('categoryName');

    if (!categoryName) {
        return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    try {
        // Check Firestore for the category
        const metaCollection = collection(db, 'meta');
        const snapshot = await getDocs(metaCollection);
        const categoryDoc = snapshot.docs.find(doc => doc.data().categoryName.toLowerCase() === categoryName.toLowerCase());

        if (categoryDoc) {
            // If found, return the description
            const description = categoryDoc.data().description;

            return NextResponse.json({
                categoryId: categoryDoc.id,
                categoryName: categoryDoc.data().categoryName,
                description: description,
            });

            // return NextResponse.json({ description });

        } else {
            // If not found, generate a description using OpenAI
            const generatedDescription = await generateDescription(categoryName);

            // console.log(generateDescription)

            // Store the new category in Firestore
            const newDocRef = await addDoc(metaCollection, {
                categoryName,
                description: generatedDescription,
            });


            return NextResponse.json({
                categoryId: newDocRef.id,
                categoryName,
                description: generatedDescription,
            });
        }
    } catch (error) {
        return NextResponse.json({ error: `Failed to fetch or create category with error. ${error}` }, { status: 500 });
    }
}

const generateDescription = async (categoryName: string) => {

    const messages: ChatCompletionMessageParam[] = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "You are a history professor specializing in the history and impact of colonization in South Asia, particularly India. Your role is to connect high-level historical information to specific events, offering insights into their significance and consequences. Use your expertise to provide detailed descriptions of categories, tags, dates, events or objects provided in the input. Responses should be in plain text format with no markdown. The response should not exceed 30 completion_tokens"
                }
            ]
        },
        {
            "role": "user",
            "content": `Generate a description for the category: ${categoryName}`
        }
    ]


    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 1,
            max_completion_tokens: 100,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        return response.choices[0].message.content?.trim();
        // return NextResponse.json({ metadata: response.choices[0].message });

    } catch (error) {
        return NextResponse.json({ error: `Failed to generate classification metadata with error ${error}` }, { status: 500 })
    }

};