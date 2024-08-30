import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.resolve('./app/api/facets/story-facets.json');
    const facets = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return NextResponse.json(facets);
}