import type { NextRequest } from "next/server";

type AttemptState = {
  count: number;
  windowStartedAt: number;
  blockedUntil?: number;
};

type RateLimitResult = {
  blocked: boolean;
  retryAfterSeconds: number;
};

const GLOBAL_KEY = "__hime_admin_auth_attempts__";

function getStore(): Map<string, AttemptState> {
  const globalRef = globalThis as typeof globalThis & {
    [GLOBAL_KEY]?: Map<string, AttemptState>;
  };

  if (!globalRef[GLOBAL_KEY]) {
    globalRef[GLOBAL_KEY] = new Map<string, AttemptState>();
  }

  return globalRef[GLOBAL_KEY];
}

function getMaxAttempts(): number {
  const value = Number(process.env.ADMIN_AUTH_RATE_LIMIT_MAX_ATTEMPTS ?? "5");
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 5;
}

function getWindowMs(): number {
  const value = Number(process.env.ADMIN_AUTH_RATE_LIMIT_WINDOW_MS ?? "600000");
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 600_000;
}

function getBlockMs(): number {
  const value = Number(process.env.ADMIN_AUTH_RATE_LIMIT_BLOCK_MS ?? "900000");
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 900_000;
}

function getClientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return `ip:${first}`;
  }

  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return `ip:${realIp}`;

  return "ip:unknown";
}

export function checkRateLimit(request: NextRequest): RateLimitResult {
  const now = Date.now();
  const key = getClientKey(request);
  const state = getStore().get(key);

  if (!state?.blockedUntil) {
    return { blocked: false, retryAfterSeconds: 0 };
  }

  if (state.blockedUntil <= now) {
    state.blockedUntil = undefined;
    state.count = 0;
    state.windowStartedAt = now;
    getStore().set(key, state);
    return { blocked: false, retryAfterSeconds: 0 };
  }

  return {
    blocked: true,
    retryAfterSeconds: Math.ceil((state.blockedUntil - now) / 1000),
  };
}

export function registerFailedAttempt(request: NextRequest): RateLimitResult {
  const now = Date.now();
  const key = getClientKey(request);
  const store = getStore();
  const windowMs = getWindowMs();
  const maxAttempts = getMaxAttempts();
  const blockMs = getBlockMs();

  let state = store.get(key);

  if (!state) {
    state = { count: 0, windowStartedAt: now };
  }

  if (state.blockedUntil && state.blockedUntil > now) {
    return {
      blocked: true,
      retryAfterSeconds: Math.ceil((state.blockedUntil - now) / 1000),
    };
  }

  if (now - state.windowStartedAt > windowMs) {
    state.count = 0;
    state.windowStartedAt = now;
    state.blockedUntil = undefined;
  }

  state.count += 1;

  if (state.count >= maxAttempts) {
    state.blockedUntil = now + blockMs;
    store.set(key, state);
    return {
      blocked: true,
      retryAfterSeconds: Math.ceil(blockMs / 1000),
    };
  }

  store.set(key, state);
  return { blocked: false, retryAfterSeconds: 0 };
}

export function clearFailedAttempts(request: NextRequest): void {
  const key = getClientKey(request);
  getStore().delete(key);
}