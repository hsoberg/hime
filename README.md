This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Support Agent (optional OpenAI)

Kundeservice-agenten fungerer med lokal kunnskapsbase uten ekstra oppsett.
Hvis du vil bruke LLM-svar med grounding mot intern kunnskap, legg til disse variablene i `.env.local`:

```bash
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-4.1-mini
SUPPORT_AGENT_LOG_ENABLED=true
SUPPORT_AGENT_LOG_PATH=./scratch/support-agent-logs.ndjson
SUPPORT_AGENT_STATS_TOKEN=optional_secret_token
ADMIN_DASHBOARD_TOKEN=choose_a_secret_token
ADMIN_AUTH_RATE_LIMIT_MAX_ATTEMPTS=5
ADMIN_AUTH_RATE_LIMIT_WINDOW_MS=600000
ADMIN_AUTH_RATE_LIMIT_BLOCK_MS=900000
```

Hvis `OPENAI_API_KEY` mangler eller API-kallet feiler, brukes automatisk lokal fallback.
Loggfil skrives som NDJSON for enkel analyse i etterkant.

Statistikk for siste 24 timer er tilgjengelig på `GET /api/support-agent/stats`.
Hvis `SUPPORT_AGENT_STATS_TOKEN` er satt, må header `x-stats-token` sendes med korrekt verdi.
Intern dashboard-side finnes på `/admin/support-agent`.
Når `ADMIN_DASHBOARD_TOKEN` er satt, blir dashboardet låst bak login på `/admin/support-agent/login`.
Login-endepunktet har enkel IP-basert rate-limit for brute-force-beskyttelse.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
