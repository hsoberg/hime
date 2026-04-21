"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";

type RefreshStatusButtonProps = {
  autoRefreshMs?: number;
};

export function RefreshStatusButton({ autoRefreshMs = 60000 }: RefreshStatusButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    if (!autoRefreshMs || autoRefreshMs <= 0) return;

    const refreshIfVisible = () => {
      if (document.visibilityState !== "visible") return;
      startTransition(() => {
        router.refresh();
      });
    };

    const intervalId = window.setInterval(refreshIfVisible, autoRefreshMs);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshIfVisible();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoRefreshMs, router, startTransition]);

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleRefresh}
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-xl border border-primary/40 bg-white px-3.5 py-2 text-sm font-semibold text-dark transition-colors hover:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`h-4 w-4 ${isPending ? "animate-spin" : ""}`} />
        {isPending ? "Oppdaterer..." : "Oppdater na"}
      </button>
      <p className="text-xs text-dark-muted">Autooppdaterer hvert minutt</p>
    </div>
  );
}
