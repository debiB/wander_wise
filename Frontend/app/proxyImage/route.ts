// app/api/proxyImage/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
  }

  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer', // Get the image as a buffer
    });

    return new NextResponse(response.data, {
      headers: {
        'Content-Type': response.headers['content-type'],
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache headers
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching image' }, { status: 500 });
  }
}
