import { NextResponse } from "next/server";

// Using the exact lowercase key and headers found in the browser trace
const SUBSCRIBER_KEY = "c97ac751-9a65-408c-b55f-13aee8ac7dd2";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://api.enduser.no/ina/address/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "accept": "*/*",
          "accept-language": "en-US,en;q=0.9",
          "subscriberkey": SUBSCRIBER_KEY,
          "Origin": "https://mktv.no",
          "Referer": "https://mktv.no/",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      }
    );

    if (!response.ok) {
      // Log the failure to help debugging if it still fails
      const errorText = await response.text();
      console.error(`INA API failure: ${response.status} - ${errorText}`);
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    
    // The API returns an array of objects. We take the first one.
    // Each object has an 'id' which is the Building ID.
    const firstResult = Array.isArray(data) ? data[0] : null;
    
    if (firstResult && firstResult.id) {
      return NextResponse.json({ 
        id: firstResult.id,
        address: firstResult.text || firstResult.name || query 
      });
    }

    return NextResponse.json({ error: "Ingen bygnings-ID funnet for denne adressen." }, { status: 404 });
  } catch (error: any) {
    console.error("Deep Link Bridge Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
