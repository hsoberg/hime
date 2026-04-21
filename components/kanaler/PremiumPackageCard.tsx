"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type PremiumPackageCardProps = {
  name: string;
  price: string;
  tag: string;
  channels: string[];
  highlight?: boolean;
  logoSrc?: string;
};

export function PremiumPackageCard({
  name,
  price,
  tag,
  channels,
  highlight,
  logoSrc,
}: PremiumPackageCardProps) {
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
        onClick={() => setOpen(true)}
        className={`relative flex w-full flex-col rounded-2xl border p-5 text-left transition-all hover:-translate-y-1 hover:shadow-lg ${
          highlight
            ? "border-dark bg-dark"
            : "border-[#E5E7EB] bg-surface-2 hover:border-primary"
        }`}
      >
        {highlight ? (
          <span className="absolute -top-3 left-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-dark">
            Mest valgt
          </span>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">{tag}</p>
        <h3 className={`mt-1 text-lg font-bold ${highlight ? "text-white" : "text-dark"}`}>{name}</h3>
        {logoSrc ? (
          <div className="relative mt-3 h-24 w-full overflow-hidden rounded-lg bg-white">
            <Image src={logoSrc} alt={name} fill sizes="(max-width: 768px) 100vw, 320px" className="object-contain object-top" />
          </div>
        ) : null}
        <p className={`mt-4 text-xl font-bold ${highlight ? "text-white" : "text-dark"}`}>
          {price} kr
          <span className={`ml-1 text-xs font-normal ${highlight ? "text-[#9BBDC5]" : "text-dark-muted"}`}>
            /mnd
          </span>
        </p>
      </button>

      {open ? (
        <div className="fixed inset-0 z-80 hime-overlay-enter">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-dark/50 backdrop-blur-[2px]"
            aria-label="Lukk pakkevisning"
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-lg border-l border-[#E5E7EB] bg-white p-6 shadow-2xl hime-panel-enter">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Premiumpakke</p>
                <h3 className="mt-1 text-2xl font-bold text-dark">{name}</h3>
                <p className="mt-1 text-sm text-dark-muted">{tag}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg border border-[#E5E7EB] px-2.5 py-1.5 text-sm text-dark hover:border-primary"
              >
                Lukk
              </button>
            </div>

            {logoSrc ? (
              <div className="relative mt-5 h-52 w-full overflow-hidden rounded-xl bg-surface-2">
                <Image src={logoSrc} alt={name} fill sizes="(max-width: 768px) 100vw, 500px" className="object-contain object-top" />
              </div>
            ) : null}

            <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-surface-2 p-4">
              <p className="text-sm font-semibold text-dark">Inkludert i pakken</p>
              <ul className="mt-3 space-y-2">
                {channels.map((channel) => (
                  <li key={channel} className="flex items-center gap-2 text-sm text-dark-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {channel}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex items-center justify-between rounded-xl border border-primary/30 bg-primary-light p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-dark-muted">Pris</p>
                <p className="text-xl font-bold text-dark">{price} kr/mnd</p>
              </div>
              <a
                href="https://minside.mktv.no/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-dark px-4 py-2.5 text-sm font-semibold text-white hover:bg-dark-mid"
              >
                Bestill i Min side
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
