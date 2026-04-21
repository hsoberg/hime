import { NextResponse } from "next/server";
import { getSupportAgentStats, normalizeSupportAgentStatsHours } from "@/lib/supportAgentStats";

export async function GET(request: Request) {
  const token = process.env.SUPPORT_AGENT_STATS_TOKEN;
  const incomingToken = request.headers.get("x-stats-token");

  if (token && incomingToken !== token) {
    return NextResponse.json(
      {
        ok: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const hours = normalizeSupportAgentStatsHours(searchParams.get("hours"), 24);

  const stats = await getSupportAgentStats(hours);
  return NextResponse.json({ ok: true, ...stats });
}
