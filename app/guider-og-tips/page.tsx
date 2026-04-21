import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  featuredStorySlug,
  getGuideArticle,
  gridStorySlugs,
  sideStorySlugs,
  type GuideArticle,
} from "./articles";

export const metadata: Metadata = {
  title: "Guider og tips for internett og TV",
  description:
    "Praktiske guider fra Hime: få bedre WiFi, feilsøk tregt internett, forstå TV-løsninger, faktura og drift. Korte svar og steg-for-steg hjelp.",
  alternates: { canonical: "https://hime.no/guider-og-tips" },
};

type PageProps = {
  searchParams: Promise<{ kategori?: string }>;
};

const quickAnswers = [
  {
    question: "Hva er den enkleste måten å forbedre WiFi på?",
    answer:
      "Plasser ruteren mer åpent og sentralt i boligen. Unngå skap, metall og hjørnelokasjoner.",
  },
  {
    question: "Hvorfor varierer internetthastigheten gjennom dagen?",
    answer:
      "Belastning i hjemmenettet, avstand til ruter og bruk av trådløst nett på mange enheter kan gi variasjoner.",
  },
  {
    question: "Hvordan ser jeg om det er en kjent driftsfeil?",
    answer:
      "Sjekk driftsmeldinger-siden. Der viser vi aktive hendelser og status på feilretting.",
  },
  {
    question: "Kan jeg se nett-TV utenfor hjemmet?",
    answer:
      "Ja, bruk nett-TV-spilleren og logg inn med gyldig konto. Tilgjengelig innhold kan variere med rettigheter.",
  },
];

export default async function GuiderOgTipsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const featuredStory = getGuideArticle(featuredStorySlug);
  const sideStories = sideStorySlugs.map((slug) => getGuideArticle(slug)).filter(Boolean);
  const stories = gridStorySlugs.map((slug) => getGuideArticle(slug)).filter(Boolean);
  const allStories = featuredStory ? [featuredStory, ...sideStories, ...stories] : [...sideStories, ...stories];

  const categories = Array.from(new Set(allStories.filter((s): s is GuideArticle => !!s).map((story) => story.category)));
  const currentKategori = params.kategori;
  const selectedCategory =
    currentKategori && categories.includes(currentKategori) ? currentKategori : "Alle";

  const visibleStories = (
    selectedCategory === "Alle"
      ? allStories
      : allStories.filter((story) => story?.category === selectedCategory)
  ).filter((s): s is GuideArticle => !!s);

  const visibleFeaturedStory = visibleStories[0];
  const visibleSideStories = visibleStories.slice(1, 4);
  const visibleGridStories = visibleStories.slice(4);

  if (!visibleFeaturedStory) {
    return null;
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quickAnswers.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guider og tips for internett og TV",
    url: "https://hime.no/guider-og-tips",
    about: ["Internett", "WiFi", "TV", "Kundeservice"],
    hasPart: allStories.filter((s): s is GuideArticle => !!s).map((story, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: story.title,
      url: `https://hime.no/guider-og-tips/${story.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />

      <section className="relative overflow-hidden bg-cover bg-center py-14 md:py-16 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')]">
        <div className="absolute inset-0 bg-black/45" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
            Guider og tips
          </p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Hime Online: Saker, guider og smarte grep i hverdagen
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-100">
            Praktiske artikler om internett, WiFi, TV og drift. Laget for kunder i Modum,
            Sigdal og Krødsherad som vil ha tydelige svar uten teknisk støy.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {["Alle", ...categories].map((tag) => (
              <Link
                key={tag}
                href={
                  tag === "Alle"
                    ? "/guider-og-tips"
                    : { pathname: "/guider-og-tips", query: { kategori: tag } }
                }
                className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition-colors ${
                  selectedCategory === tag
                    ? "border-dark bg-dark text-white"
                    : "border-dark/10 bg-white/70 text-dark hover:bg-white"
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://player.mktv.no/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl bg-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-dark-mid"
            >
              Se nett-TV
            </a>
            <Link
              href="/kundeservice"
              className="inline-flex items-center rounded-xl border border-dark/20 px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-white"
            >
              Gå til kundeservice
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-6 text-sm font-medium text-dark-muted">
            Viser: <span className="text-dark">{selectedCategory}</span>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <Link
              href={`/guider-og-tips/${visibleFeaturedStory.slug}`}
              className="group overflow-hidden rounded-3xl border border-light bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={visibleFeaturedStory.image}
                  alt={visibleFeaturedStory.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 md:p-7">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-primary-light px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                    {visibleFeaturedStory.category}
                  </span>
                  <span className="text-xs font-medium text-dark-muted">{visibleFeaturedStory.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight text-dark md:text-3xl">{visibleFeaturedStory.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-dark-muted">{visibleFeaturedStory.description}</p>
                <span className="mt-5 inline-block text-sm font-semibold text-primary group-hover:underline">
                  Les saken
                </span>
              </div>
            </Link>

            <aside className="rounded-3xl border border-light bg-white p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-dark md:text-xl">Siste saker</h3>
                <span className="text-xs font-medium uppercase tracking-wide text-dark-muted">Hime Online</span>
              </div>
              <div className="space-y-4">
                {visibleSideStories.length === 0 ? (
                  <p className="rounded-2xl bg-surface-2 p-4 text-sm text-dark-muted">
                    Ingen flere saker i denne kategorien akkurat nå.
                  </p>
                ) : null}
                {visibleSideStories.map((story) => (
                  <Link
                    key={story.title}
                    href={`/guider-og-tips/${story.slug}`}
                    className="group flex gap-3 rounded-2xl p-2 transition-colors hover:bg-surface-2"
                  >
                    <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{story.category}</p>
                      <p className="mt-1 text-sm font-semibold leading-snug text-dark group-hover:underline">{story.title}</p>
                      <p className="mt-1 text-xs text-dark-muted">{story.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-bold text-dark md:text-3xl">Flere saker</h2>
            <p className="text-sm text-dark-muted">Fiktive artikler tilpasset Hime.no</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleGridStories.map((story) => (
              <Link
                key={story.title}
                href={`/guider-og-tips/${story.slug}`}
                className="group overflow-hidden rounded-2xl border border-light bg-white transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{story.category}</p>
                    <p className="text-xs text-dark-muted">{story.readTime}</p>
                  </div>
                  <h3 className="text-lg font-bold text-dark">{story.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-muted">{story.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                    Les saken
                  </span>
                </div>
              </Link>
            ))}
            {visibleGridStories.length === 0 ? (
              <div className="rounded-2xl border border-light bg-white p-5 text-sm text-dark-muted sm:col-span-2 lg:col-span-3">
                Ingen flere saker i denne kategorien ennå.
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-dark md:text-3xl">Hurtigsvar</h2>
          <p className="mt-3 text-dark-muted">
            Direkte svar på spørsmål vi ofte får fra kunder.
          </p>

          <div className="mt-8 divide-y divide-[#E5E7EB] rounded-2xl border border-[#E5E7EB] bg-white">
            {quickAnswers.map((item) => (
              <article key={item.question} className="p-5 md:p-6">
                <h3 className="text-base font-semibold text-dark md:text-lg">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted md:text-base">{item.answer}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kundeservice"
              className="inline-flex items-center rounded-xl bg-dark px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-dark-mid"
            >
              Alle hjelpesider
            </Link>
            <a
              href="https://player.mktv.no/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-xl border border-dark/20 px-6 py-3 text-sm font-semibold text-dark transition-colors hover:bg-white"
            >
              Se nett-TV
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
