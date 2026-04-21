import { NextResponse, type NextRequest } from "next/server";
import {
  ADMIN_AUTH_COOKIE_NAME,
  ADMIN_DASHBOARD_PATH,
  ADMIN_LOGIN_PATH,
  getAdminDashboardToken,
  isAdminDashboardAuthEnabled,
} from "@/lib/adminDashboardAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(ADMIN_DASHBOARD_PATH)) {
    return NextResponse.next();
  }

  if (!isAdminDashboardAuthEnabled()) {
    return NextResponse.next();
  }

  if (pathname === ADMIN_LOGIN_PATH) {
    return NextResponse.next();
  }

  const cookieToken = request.cookies.get(ADMIN_AUTH_COOKIE_NAME)?.value;
  const expectedToken = getAdminDashboardToken();

  if (cookieToken && cookieToken === expectedToken) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = ADMIN_LOGIN_PATH;
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/support-agent/:path*"],
};