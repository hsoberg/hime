export const ADMIN_AUTH_COOKIE_NAME = "hime_admin_auth";
export const ADMIN_DASHBOARD_PATH = "/admin/support-agent";
export const ADMIN_LOGIN_PATH = "/admin/support-agent/login";

export function getAdminDashboardToken(): string {
  return process.env.ADMIN_DASHBOARD_TOKEN ?? "";
}

export function isAdminDashboardAuthEnabled(): boolean {
  return getAdminDashboardToken().length > 0;
}

export function sanitizeRedirectPath(value: string | null | undefined): string {
  if (!value) return ADMIN_DASHBOARD_PATH;
  if (!value.startsWith("/")) return ADMIN_DASHBOARD_PATH;
  if (value.startsWith("//")) return ADMIN_DASHBOARD_PATH;
  return value;
}