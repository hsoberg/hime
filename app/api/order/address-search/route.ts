import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.trim();

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  try {
    const response = await fetch(
      `https://mktv.no/api/search/address/?query=${encodeURIComponent(query)}`,
      {
        headers: {
          accept: "application/json",
        },
        next: { revalidate: 60 },
      },
    );

    if (!response.ok) {
      return NextResponse.json({ results: [] }, { status: 200 });
    }

    const payload = (await response.json()) as {
      query?: string;
      results?: Array<{ id: number; text: string; sub?: string }>;
    };

    return NextResponse.json({
      query: payload.query ?? query,
      results: payload.results ?? [],
    });
  } catch {
    return NextResponse.json({ results: [] }, { status: 200 });
  }
}
