import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_AUTH_COOKIE_NAME,
  ADMIN_DASHBOARD_PATH,
  getAdminDashboardToken,
  isAdminDashboardAuthEnabled,
  sanitizeRedirectPath,
} from "@/lib/adminDashboardAuth";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Innlogging for support-agent dashboard.",
};

type LoginPageProps = {
  searchParams?: Promise<{
    next?: string;
    error?: string;
    retry?: string;
  }>;
};

export default async function SupportAgentLoginPage({ searchParams }: LoginPageProps) {
  const params = (await searchParams) ?? {};
  const next = sanitizeRedirectPath(params.next ?? ADMIN_DASHBOARD_PATH);
  const hasError = params.error === "1";
  const isRateLimited = params.error === "rate";
  const retrySeconds = Number(params.retry ?? "0");
  const retryMinutes = retrySeconds > 0 ? Math.ceil(retrySeconds / 60) : 0;

  if (!isAdminDashboardAuthEnabled()) {
    return (
      <main className="min-h-screen bg-[linear-gradient(180deg,#f6fbfc_0%,#ffffff_35%)]">
        <section className="max-w-lg mx-auto px-4 py-20">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_-35px_rgba(0,60,70,0.35)]">
            <h1 className="text-2xl font-bold text-slate-900">Admin-auth ikke aktivert</h1>
            <p className="mt-3 text-slate-600">
              Sett <strong>ADMIN_DASHBOARD_TOKEN</strong> i miljøvariabler for å aktivere lås på dashboardet.
            </p>
            <a
              href={ADMIN_DASHBOARD_PATH}
              className="mt-6 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-white text-sm font-semibold"
            >
              Gå til dashboard
            </a>
          </div>
        </section>
      </main>
    );
  }

  const cookieStore = await cookies();
  const currentToken = cookieStore.get(ADMIN_AUTH_COOKIE_NAME)?.value;
  const expectedToken = getAdminDashboardToken();

  if (currentToken && currentToken === expectedToken) {
    redirect(next);
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6fbfc_0%,#ffffff_35%)]">
      <section className="max-w-lg mx-auto px-4 py-20">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_18px_45px_-35px_rgba(0,60,70,0.35)]">
          <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-800">
            Intern tilgang
          </p>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">Logg inn på dashboard</h1>
          <p className="mt-3 text-slate-600">
            Oppgi admin-token for å se statistikk for kundeservice-agenten.
          </p>

          {hasError ? (
            <p className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              Feil token. Prøv igjen.
            </p>
          ) : null}

          {isRateLimited ? (
            <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
              For mange feilforsok. Prøv igjen om {retryMinutes > 0 ? `${retryMinutes} min` : "kort tid"}.
            </p>
          ) : null}

          <form action="/api/admin-auth" method="post" className="mt-6 space-y-4">
            <input type="hidden" name="redirectTo" value={next} />
            <div>
              <label htmlFor="token" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Admin token
              </label>
              <input
                id="token"
                name="token"
                type="password"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                placeholder="Skriv inn token"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-[linear-gradient(135deg,#003C46_0%,#005B67_100%)] px-4 py-2.5 text-white font-semibold"
            >
              Logg inn
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
