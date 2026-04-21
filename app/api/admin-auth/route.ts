import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_AUTH_COOKIE_NAME,
  ADMIN_DASHBOARD_PATH,
  ADMIN_LOGIN_PATH,
  getAdminDashboardToken,
  sanitizeRedirectPath,
} from "@/lib/adminDashboardAuth";
import {
  checkRateLimit,
  clearFailedAttempts,
  registerFailedAttempt,
} from "@/lib/adminAuthRateLimit";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const action = (formData.get("action") as string | null) ?? "login";
  const redirectTo = sanitizeRedirectPath((formData.get("redirectTo") as string | null) ?? ADMIN_DASHBOARD_PATH);

  if (action === "logout") {
    const response = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
    response.cookies.delete(ADMIN_AUTH_COOKIE_NAME);
    return response;
  }

  const rateLimit = checkRateLimit(request);
  if (rateLimit.blocked) {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("error", "rate");
    loginUrl.searchParams.set("retry", String(rateLimit.retryAfterSeconds));
    loginUrl.searchParams.set("next", redirectTo);

    const response = NextResponse.redirect(loginUrl);
    response.headers.set("Retry-After", String(rateLimit.retryAfterSeconds));
    return response;
  }

  const expectedToken = getAdminDashboardToken();
  if (!expectedToken) {
    return NextResponse.json(
      {
        ok: false,
        message: "ADMIN_DASHBOARD_TOKEN is not configured.",
      },
      { status: 500 }
    );
  }

  const submittedToken = ((formData.get("token") as string | null) ?? "").trim();
  if (!submittedToken || submittedToken !== expectedToken) {
    const failed = registerFailedAttempt(request);
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    if (failed.blocked) {
      loginUrl.searchParams.set("error", "rate");
      loginUrl.searchParams.set("retry", String(failed.retryAfterSeconds));
    } else {
      loginUrl.searchParams.set("error", "1");
    }
    loginUrl.searchParams.set("next", redirectTo);

    const response = NextResponse.redirect(loginUrl);
    if (failed.blocked) {
      response.headers.set("Retry-After", String(failed.retryAfterSeconds));
    }

    return response;
  }

  clearFailedAttempts(request);

  const response = NextResponse.redirect(new URL(redirectTo, request.url));
  response.cookies.set({
    name: ADMIN_AUTH_COOKIE_NAME,
    value: expectedToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}