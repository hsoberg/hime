"use client";

import { useState } from "react";

type ChannelLogoProps = {
  name: string;
  src?: string;
  className?: string;
  imageClassName?: string;
};

function getFallbackLogo(name: string) {
  const cleanName = name.replace(/\s+/g, " ").trim();

  if (/^v sport/i.test(cleanName)) {
    return {
      primary: "V SPORT",
      secondary: cleanName.replace(/^v sport\s*/i, "").trim() || undefined,
      accent: "bg-[#0009ff]",
    };
  }

  if (/^v film/i.test(cleanName)) {
    return {
      primary: "V FILM",
      secondary: cleanName.replace(/^v film\s*/i, "").trim() || undefined,
      accent: "bg-[#ff4f4f]",
    };
  }

  if (/^tv 2 sport/i.test(cleanName)) {
    return {
      primary: "TV 2",
      secondary: cleanName.replace(/^tv 2\s*/i, "").trim(),
      accent: "bg-teal",
    };
  }

  return {
    primary: cleanName,
    secondary: undefined,
    accent: "bg-primary",
  };
}

export function ChannelLogo({
  name,
  src,
  className = "",
  imageClassName = "",
}: ChannelLogoProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = Boolean(src && failedSrc === src);
  const fallbackLogo = getFallbackLogo(name);

  if (!src || failed) {
    return (
      <div
        className={`relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-tight bg-white px-2 text-center uppercase text-dark ${className}`}
        aria-label={`${name} logo`}
      >
        <span className={`mb-1 h-1 w-9 rounded-full ${fallbackLogo.accent}`} />
        <span className="max-w-full text-[12px] font-black leading-tight tracking-wider">
          {fallbackLogo.primary}
        </span>
        {fallbackLogo.secondary && (
          <span className="mt-0.5 max-w-full text-[9px] font-extrabold leading-tight tracking-widest text-dark-muted">
            {fallbackLogo.secondary}
          </span>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setFailedSrc(src)}
      className={`max-h-full max-w-full object-contain ${imageClassName}`}
    />
  );
}
