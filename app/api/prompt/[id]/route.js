import Prompt from "@models/prompt";
import { ConnectToDb } from "@utils/database";

// Get
export const GET = async (request, { params }) => {
    try {
        await ConnectToDb()
        const prompt = await Prompt.findById(params.id).populate('creator')
        if (!prompt) return new Response('Prompt not found', { statu: 404 })
        return new Response(JSON.stringify(prompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// Update
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json()
    try {
        await ConnectToDb()
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response('Prompt not found', { statu: 404 })
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}

// Delete
export const DELETE = async (req, { params }) => {
    try {
        await ConnectToDb()
        await Prompt.findByIdAndRemove(params.id);

        return new Response('Prompt deleted successfully', { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompts", { status: 500 })
    }
}