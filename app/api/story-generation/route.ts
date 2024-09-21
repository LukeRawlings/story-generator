import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import Prompt from '../../../src/prompt';
import FacetDefinition from '@/src/facet-definition';

export async function POST(req: NextRequest) {
    const { conflict, pointOfView, setting } = await req.json();

    const facetDefinition: FacetDefinition = new FacetDefinition({conflict, pointOfView, setting});

    if(!facetDefinition.isValid())
        return NextResponse.json({ message: JSON.stringify(['Please choose a value for each facet.']) });

    const openAiApiKeyPath = '../api-key.txt';
    const openAiApiKeyExists: boolean = fs.existsSync(path.resolve(openAiApiKeyPath));
    if(!openAiApiKeyExists)
        return NextResponse.json({ message: JSON.stringify(['API key not found. You must create an `api-key.txt` file in the parent directory with an OpenAI API key. Get one here: https://platform.openai.com/settings/organization/billing/overview.']) });
    const openAiApiKey = fs.readFileSync(path.resolve(openAiApiKeyPath), 'utf8');
    if(openAiApiKey.length < 1)
        return NextResponse.json({ message: JSON.stringify([`API key not found in ${openAiApiKeyPath}. You must populate 'api-key.txt' in the parent directory with an OpenAI API key. Get one here: https://platform.openai.com/settings/organization/billing/overview.`]) });

    const openAiApiUrl = 'https://api.openai.com/v1/chat/completions';

    let result = JSON.stringify(['Once upon a time there was little application that failed to generate a story :(']);
    const prompt = Prompt.get(facetDefinition);

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
        const messageContent: string = response.data.choices[0].message.content;

        const paragraphs: string[] = messageContent.split('\n');

        result = JSON.stringify(paragraphs);
    } catch (error) {
        console.error('Error calling ChatGPT:', error);
    }

    return NextResponse.json({ message: result });
}