import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN
});

export async function GET(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const prediction = await replicate.predictions.get(id);

    if (prediction?.error) {
        return new Response(
            JSON.stringify({ detail: prediction.error }),
            { status: 500 }
        );
    }

    return new Response(
        JSON.stringify(prediction),
        { status: 200 }
    );
}