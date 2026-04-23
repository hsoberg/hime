import { NextResponse } from "next/server";
import { getFullTvGuide } from "@/lib/epg/epgService";
import { allChannels } from "@/lib/channelData";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || undefined;
  const category = searchParams.get("category") || undefined;

  try {
    let channels = allChannels;
    
    if (category && category !== "Alle") {
      channels = allChannels.filter(ch => ch.category === category);
    }

    const guide = await getFullTvGuide(channels, date);
    return NextResponse.json(guide);
  } catch (error) {
    console.error("EPG API Error:", error);
    return NextResponse.json({ error: "Failed to fetch EPG" }, { status: 500 });
  }
}
