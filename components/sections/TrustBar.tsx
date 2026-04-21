const stats = [
  { value: "1996", label: "Etablert" },
  { value: "25", label: "Lokale ansatte" },
  { value: "5 kommuner", label: "Dekningsområde" },
  { value: "Man–lør", label: "Kundeservice" },
];

export function TrustBar() {
  return (
    <section className="bg-white border-y border-border py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="relative group">
              <p className="text-display-l text-primary group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              <p className="mt-2 text-label text-dark opacity-70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
