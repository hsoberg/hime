import Link from "next/link";
import Image from "next/image";
import { guideArticles } from "@/app/guider-og-tips/articles";

export function AktueltSection() {
  // Take the first 3 articles
  const latestArticles = guideArticles.slice(0, 3);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-h2 md:text-h1 text-dark">Aktuelt</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {latestArticles.map((article) => (
            <div 
              key={article.slug} 
              className="flex flex-col bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
            >
              {/* Image */}
              <div className="relative aspect-video">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <p className="text-caption text-dark/40 mb-3">{article.publishedAt}</p>
                <h3 className="text-h3 text-dark mb-4 leading-snug">
                  {article.title}
                </h3>
                <p className="text-body-small text-dark/60 mb-8 line-clamp-3 leading-relaxed">
                  {article.description}
                </p>

                <div className="mt-auto">
                  <Link 
                    href={`/guider-og-tips/${article.slug}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    Les mer
                    <ArrowIcon />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/guider-og-tips"
            className="inline-block text-dark font-bold border-b-2 border-primary/20 hover:border-primary transition-all pb-1"
          >
            Se alle Guider og tips
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg 
      width="20" 
      height="12" 
      viewBox="0 0 20 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path 
        d="M1 6H19M19 6L14 1M19 6L14 11" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}
