import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
});

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
    const { imageUrl } = await req.json();

    if (!process.env.REPLICATE_API_TOKEN) {
        throw new Error("The REPLICATE_API_TOKEN environment variable is not set.");
    }

    const prediction = await replicate.predictions.create({
        version: "ca494ba129e44e45f661d6ece83c4c98a9a7c774309beca01429b58fce8aa695",
        input: { image: imageUrl },
    });

    if (prediction?.error) {
        return new Response(JSON.stringify({ detail: prediction.error }), { status: 500 });
    }

    return new Response(
        JSON.stringify(prediction),
        { status: 201 }
    );
}