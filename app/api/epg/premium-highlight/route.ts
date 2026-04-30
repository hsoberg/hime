import { NextRequest, NextResponse } from "next/server";
import { getPremiumGuideHighlight } from "@/lib/epg/premiumHighlights";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const nowParam = request.nextUrl.searchParams.get("now");
    const now = nowParam ? new Date(nowParam) : new Date();
    const highlight = await getPremiumGuideHighlight(Number.isNaN(now.getTime()) ? new Date() : now);

    return NextResponse.json(highlight);
  } catch (error) {
    console.error("Premium highlight API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch premium highlight" },
      { status: 500 }
    );
  }
}
