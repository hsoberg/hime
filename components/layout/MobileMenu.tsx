"use client";

import { useState } from "react";
import Link from "next/link";

type NavLink = { href: string; label: string };
type MenuLink = NavLink & { external?: boolean };

import { Button } from "@/components/ui/Button";

export function MobileMenu({ links }: { links: MenuLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="p-2 rounded-tight text-white hover:bg-white/10 transition-colors"
        aria-label={open ? "Lukk meny" : "Åpne meny"}
        aria-expanded={open}
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>

      {open && (
        <div className="fixed inset-0 top-[64px] bg-surface z-50 overflow-y-auto hime-overlay-enter">
          <nav className="flex flex-col px-6 py-8 gap-1">
            {links.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="w-full px-5 py-4 rounded-card text-dark font-medium text-lg hover:bg-surface-soft hover:text-primary transition-all flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-primary opacity-30">↗</span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="w-full px-5 py-4 rounded-card text-dark font-medium text-lg hover:bg-surface-soft hover:text-primary transition-all flex items-center justify-between"
                >
                  {link.label}
                  <span className="text-primary opacity-30">→</span>
                </Link>
              )
            ))}
            
            <div className="mt-8 pt-8 border-t border-border space-y-4">
              <Link href="https://mktv.no/bestille" onClick={() => setOpen(false)} className="block">
                <Button variant="primary" className="w-full text-lg py-4">
                  Sjekk tilgjengelighet
                </Button>
              </Link>
              <a href="https://minside.mktv.no/" onClick={() => setOpen(false)} className="block">
                <Button variant="ghost" className="w-full text-lg py-4">
                  Logg inn på Min side
                </Button>
              </a>
            </div>
            
            <div className="mt-12 p-6 bg-surface-soft rounded-panel border border-border">
              <p className="text-label text-dark mb-2">Trenger du hjelp?</p>
              <a href="tel:+4732784640" className="text-h3 text-primary block hover:underline">
                32 78 46 40
              </a>
              <p className="text-caption text-dark/60 mt-1">Hverdager 08–19 | Lørdag 10–14</p>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
