import Link from "next/link";
import Image from "next/image";
import { MobileMenu } from "./MobileMenu";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/produkter-og-priser", label: "Produkter og priser" },
  { href: "/kundeservice", label: "Kundeservice" },
  { href: "/driftsmeldinger", label: "Driftsmeldinger" },
  { href: "/kontakt-oss", label: "Kontakt oss" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-primary shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/Hime_Logo_Hvit_RGB.svg"
              alt="Hime"
              width={100}
              height={36}
              className="w-auto h-8 md:h-9"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 mx-4">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-tight text-body-base text-white font-medium hover:bg-white/10 transition-all whitespace-nowrap"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-tight text-body-base text-white font-medium hover:bg-white/10 transition-all whitespace-nowrap"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link href="/min-side">
              <Button variant="ghost" size="sm" className="font-semibold px-5 border-white/30 text-white hover:bg-white/10 hover:text-white">
                Min side
              </Button>
            </Link>
            <Link href="https://mktv.no/bestille">
              <Button variant="secondary" size="sm" className="font-semibold px-5 shadow-lg">
                Bestill nå
              </Button>
            </Link>
          </div>

          {/* Mobile menu container (adjusting for white icon on pink) */}
          <div className="lg:hidden">
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
