"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type ChannelInfoCardProps = {
  name: string;
  description: string;
  logoSrc?: string;
  onOpen?: (name: string) => void;
};

export function ChannelInfoCard({ name, description, logoSrc, onOpen }: ChannelInfoCardProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.(name);
          setOpen(true);
        }}
        className="group relative flex w-full items-center gap-3 rounded-xl border border-[#E5E7EB] bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
      >
        <div className="flex h-12 w-20 shrink-0 items-center justify-center rounded-md border border-[#F1F1F1] bg-white px-2">
          {logoSrc ? (
            <div className="relative h-9 w-full">
              <Image src={logoSrc} alt={name} fill sizes="120px" className="object-contain" />
            </div>
          ) : (
            <span className="text-xs text-dark-muted">Ingen logo</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-dark">{name}</p>
          <p className="mt-1 text-xs text-dark-muted">Klikk for detaljer</p>
        </div>
        <span className="rounded-full bg-primary-light px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-dark">
          Info
        </span>
      </button>

      {open ? (
        <div className="fixed inset-0 z-80 hime-overlay-enter">
          <button
            type="button"
            aria-label="Lukk kanalinfo"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-dark/50 backdrop-blur-[2px]"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md border-l border-[#E5E7EB] bg-white p-6 shadow-2xl hime-panel-enter">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Kanaldetaljer</p>
                <h3 className="mt-1 text-xl font-bold text-dark">{name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[#E5E7EB] px-2.5 py-1.5 text-sm text-dark hover:border-primary"
              >
                Lukk
              </button>
            </div>

            <div className="mt-6 rounded-xl border border-[#E5E7EB] bg-surface-2 p-4">
              <div className="flex h-20 items-center justify-center rounded-lg bg-white p-3">
                {logoSrc ? (
                  <div className="relative h-14 w-full">
                    <Image src={logoSrc} alt={name} fill sizes="320px" className="object-contain" />
                  </div>
                ) : (
                  <span className="text-sm text-dark-muted">Ingen logo tilgjengelig</span>
                )}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-dark-muted">{description}</p>
            </div>

            <a
              href="https://minside.mktv.no/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-dark hover:bg-primary-dark"
            >
              Administrer kanaler i Min side
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
