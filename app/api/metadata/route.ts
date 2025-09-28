import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: "Valid URL is required" },
        { status: 400 }
      );
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch webpage" },
        { status: 400 }
      );
    }

    const html = await response.text();

    // Extract metadata using regex patterns
    const getMetaContent = (property: string): string | null => {
      const patterns = [
        new RegExp(`<meta\\s+property=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+property=["']${property}["']`, 'i'),
        new RegExp(`<meta\\s+name=["']${property}["']\\s+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${property}["']`, 'i')
      ];

      for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) return match[1];
      }
      return null;
    };

    // Extract title from title tag
    const getTitleFromTag = (): string | null => {
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return titleMatch ? titleMatch[1].trim() : null;
    };

    // Extract metadata
    const metadata = {
      title: getMetaContent('og:title') || 
              getMetaContent('twitter:title') || 
              getTitleFromTag() || 
              null,
      description: getMetaContent('og:description') || 
                   getMetaContent('twitter:description') || 
                   getMetaContent('description') || 
                   null,
      image: getMetaContent('og:image') || 
             getMetaContent('twitter:image') || 
             getMetaContent('twitter:image:src') || 
             null
    };

    // Clean up the metadata
    if (metadata.title) {
      metadata.title = metadata.title.replace(/&amp;/g, '&')
                                   .replace(/&lt;/g, '<')
                                   .replace(/&gt;/g, '>')
                                   .replace(/&quot;/g, '"')
                                   .replace(/&#039;/g, "'");
    }

    if (metadata.description) {
      metadata.description = metadata.description.replace(/&amp;/g, '&')
                                                 .replace(/&lt;/g, '<')
                                                 .replace(/&gt;/g, '>')
                                                 .replace(/&quot;/g, '"')
                                                 .replace(/&#039;/g, "'");
    }

    // Make image URL absolute if it's relative
    if (metadata.image && !metadata.image.startsWith('http')) {
      const baseUrl = new URL(url);
      if (metadata.image.startsWith('//')) {
        metadata.image = `${baseUrl.protocol}${metadata.image}`;
      } else if (metadata.image.startsWith('/')) {
        metadata.image = `${baseUrl.protocol}//${baseUrl.host}${metadata.image}`;
      } else {
        metadata.image = `${baseUrl.protocol}//${baseUrl.host}/${metadata.image}`;
      }
    }

    return NextResponse.json(metadata);
  } catch (error) {
    console.error("Metadata extraction error:", error);
    return NextResponse.json(
      { error: "Failed to extract metadata" },
      { status: 500 }
    );
  }
}