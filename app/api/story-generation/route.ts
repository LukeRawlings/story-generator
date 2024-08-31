import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    const { conflict, pointOfView, setting } = await req.json();

    if(conflict === '' || pointOfView === '' || setting === '') {
        return NextResponse.json({ message: JSON.stringify(['Please choose a value for each facet.']) });
    }

    const openAiApiKey = fs.readFileSync(path.resolve('../api-key.txt'), 'utf8');
    const openAiApiUrl = 'https://api.openai.com/v1/chat/completions';

    let result = JSON.stringify(['Once upon a time there was little application that failed to generate a story :(']);
    const prompt = `Tell me a story in 300 words with these details: Conflict: ${conflict}, Point of View: ${pointOfView}, Setting: ${setting}. Even though it's short, try to bring each story to a resolution or cliffhanger. Only respond with the body of the story with no extraneous notes. Separate paragraphs using a newline character, with a backslash and n.`;

    try {
        const response: any = await axios.post(
            openAiApiUrl,
            {
                model: 'gpt-4o-mini',
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
        const messageContent = response.data.choices[0].message.content;

        const paragraphs: string[] = messageContent.split('\n');

        result = JSON.stringify(paragraphs);
    } catch (error) {
        console.error('Error calling ChatGPT:', error);
    }

    return NextResponse.json({ message: result });
}