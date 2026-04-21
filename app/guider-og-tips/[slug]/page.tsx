import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guideArticles, getGuideArticle } from "../articles";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return guideArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getGuideArticle(slug);

  if (!article) {
    return {
      title: "Sak ikke funnet",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${article.title} | Guider og tips`,
    description: article.description,
    alternates: { canonical: `https://hime.no/guider-og-tips/${article.slug}` },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getGuideArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = [
    ...guideArticles.filter((item) => item.slug !== article.slug && item.category === article.category),
    ...guideArticles.filter((item) => item.slug !== article.slug && item.category !== article.category),
  ].slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    image: `https://hime.no${article.image}`,
    mainEntityOfPage: `https://hime.no/guider-og-tips/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Hime",
      url: "https://hime.no",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="pb-16 md:pb-24">
        <section className="bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] py-12 md:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <Link
              href="/guider-og-tips"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-white/20"
            >
              Tilbake til Guider og tips
            </Link>

            <div className="mt-6 max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/80">{article.category}</p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-5xl">{article.title}</h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/90 md:text-lg">
                {article.description}
              </p>
              <p className="mt-4 text-sm font-medium text-white/80">
                {article.readTime} • Publisert {article.publishedAt}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-8 max-w-6xl px-4 sm:px-6 md:mt-10">
          <article className="overflow-hidden rounded-3xl border border-light bg-white shadow-sm">
            <div className="relative aspect-video">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>

            <div className="grid gap-10 p-6 md:grid-cols-[1.9fr_1fr] md:p-10">
              <div className="space-y-8">
                {article.sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-2xl font-bold text-dark">{section.title}</h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="leading-relaxed text-dark-muted">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-5 space-y-2 rounded-2xl bg-surface-2 p-5 text-sm text-dark">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </section>
                ))}
              </div>

              <aside className="h-fit rounded-2xl border border-light bg-surface-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">Neste steg</p>
                <h3 className="mt-2 text-lg font-bold text-dark">Trenger du mer hjelp?</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">
                  Se relaterte hjelpesider for konkrete steg, eller kontakt oss hvis du vil at vi
                  skal se på saken sammen med deg.
                </p>
                <div className="mt-5 space-y-3">
                  <Link
                    href={article.sourceHref}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-dark px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-dark-mid"
                  >
                    {article.sourceLabel}
                  </Link>
                  <Link
                    href="/kontakt-oss"
                    className="inline-flex w-full items-center justify-center rounded-xl border border-dark/20 px-4 py-3 text-sm font-semibold text-dark transition-colors hover:bg-white"
                  >
                    Kontakt oss
                  </Link>
                </div>
              </aside>
            </div>
          </article>
        </section>

        <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 md:mt-14">
          <div className="mb-6 flex items-end justify-between gap-3">
            <h2 className="text-2xl font-bold text-dark">Relaterte saker</h2>
            <Link
              href="/guider-og-tips"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Se alle saker
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                href={`/guider-og-tips/${item.slug}`}
                className="group overflow-hidden rounded-2xl border border-light bg-white transition-all hover:-translate-y-1 hover:border-primary hover:shadow-md"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">{item.category}</p>
                    <p className="text-xs text-dark-muted">{item.readTime}</p>
                  </div>
                  <h3 className="text-lg font-bold text-dark">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-dark-muted">{item.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-primary group-hover:underline">
                    Les saken
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
