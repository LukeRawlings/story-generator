import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    const { conflict, pointOfView, setting } = await req.json();

    const openAiApiKey = fs.readFileSync(path.resolve('../api-key.txt'), 'utf8');
    const openAiApiUrl = 'https://api.openai.com/v1/chat/completions';

    let result = 'Once upon a time there was little application that failed to generate a story :(';
    const prompt = `Tell me a story in 300 words with these details: Conflict: ${conflict}, Point of View: ${pointOfView}, Setting: ${setting}. Only respond with the body of the story with no extraneous notes. Make it all one huge paragraph, with no newline characters.`;

    try {
        const response: any = await axios.post(
            openAiApiUrl,
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a master story teller.' },
                    { role: 'user', content: prompt }
                ],
                max_tokens: 600, // 20, // use for debugging to save time & tokens
            },
            {
                headers: {
                    'Authorization': `Bearer ${openAiApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        result = response.data.choices[0].message.content
    } catch (error) {
        console.error('Error calling ChatGPT:', error);
    }

    return NextResponse.json({ message: result });
}