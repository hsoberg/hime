import { NextResponse } from "next/server";
import { getTvGuide } from "@/lib/epg/epgService";

const PRIMARY_CHANNELS = [
  { name: "NRK1", logo: "https://hime.no/wp-content/uploads/2025/02/NRK1.png" },
  { name: "NRK2", logo: "https://hime.no/wp-content/uploads/2025/02/NRK2.png" },
  { name: "TV 2 Direkte", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Direkte.png" },
  { name: "TVNorge", logo: "https://hime.no/wp-content/uploads/2024/02/TVNorge.png" },
  { name: "TV3", logo: "https://hime.no/wp-content/uploads/2024/11/TV3_Norway_logo_2016.svg" },
  { name: "TV 2 Sport 1", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Sport1.png" },
  { name: "Discovery Channel", logo: "https://hime.no/wp-content/uploads/2024/02/Discovery.png" },
  { name: "Eurosport 1", logo: "https://hime.no/wp-content/uploads/2023/05/Eurosport1.png" },
];

export async function GET() {
  try {
    const guide = await getTvGuide(PRIMARY_CHANNELS);
    return NextResponse.json(guide);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch EPG" }, { status: 500 });
  }
}
