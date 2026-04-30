import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const ALLOWED_HOST = "cdn.sportsnext.schibsted.io";

export async function GET(request: NextRequest) {
  const source = request.nextUrl.searchParams.get("src");
  const size = request.nextUrl.searchParams.get("size") ?? "96";

  if (!source) {
    return new Response("Missing src", { status: 400 });
  }

  let url: URL;

  try {
    url = new URL(source);
  } catch {
    return new Response("Invalid src", { status: 400 });
  }

  if (url.protocol !== "https:" || url.hostname !== ALLOWED_HOST) {
    return new Response("Unsupported logo source", { status: 400 });
  }

  if (!url.pathname.endsWith(".webp")) {
    url.pathname = `${url.pathname}.webp`;
  }

  url.searchParams.set("rule", `clip-${size}x${size}`);

  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      accept: "image/webp,image/*,*/*;q=0.8",
    },
  });

  if (!response.ok) {
    return new Response("Logo not found", { status: 404 });
  }

  return new Response(await response.arrayBuffer(), {
    headers: {
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      "Content-Type": response.headers.get("content-type") ?? "image/webp",
    },
  });
}
