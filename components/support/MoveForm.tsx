"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function MoveForm() {
  const [formData, setFormData] = useState({
    ownerType: "Eier",
    name: "",
    customerNumber: "",
    postalCode: "",
    email: "",
    address: "",
    postLocation: "",
    phone: "",
    moveDate: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/move-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Det oppsto en feil under sending.");
      }

      setSubmitted(true);
      setFormData({
        ownerType: "Eier",
        name: "",
        customerNumber: "",
        postalCode: "",
        email: "",
        address: "",
        postLocation: "",
        phone: "",
        moveDate: "",
      });
    } catch (err) {
      console.error("Form error:", err);
      setError(err instanceof Error ? err.message : "Kunne ikke sende skjemaet. Vennligst prøv igjen senere.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#003C46] mb-4">
            Skal du flytte?
          </h2>
          <p className="text-[#4A7080] max-w-2xl mx-auto">
            Registrer din kontaktinformasjon for å melde flytting.
          </p>
          <div className="mt-4 space-y-2 text-sm text-[#4A7080]">
            <p>Hvis du informerer oss om hvem som overtar boligen du flytter ifra, slipper du oppsigelsestiden. Du betaler da kun for inneværende måned.</p>
            <p>Vi vil kontakte ny eier for å tilby våre tjenester.</p>
            <p className="font-semibold text-[#003C46]">Viktig! Er du i bindingstid, må den nye eieren overta abonnementet for at du ikke skal bli belastet med bruddgebyr.</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-12 bg-[#F5F5F5] rounded-2xl p-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#003C46] text-white flex items-center justify-center font-bold text-lg mb-2">
                1
              </div>
              <h3 className="text-sm font-bold text-[#003C46] text-center">Hvem er du?</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#003C46] text-white flex items-center justify-center font-bold text-lg mb-2">
                2
              </div>
              <h3 className="text-sm font-bold text-[#003C46] text-center">Hvor flytter du?</h3>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#003C46] text-white flex items-center justify-center font-bold text-lg mb-2">
                3
              </div>
              <h3 className="text-sm font-bold text-[#003C46] text-center">Hvem flytter inn?</h3>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-[#F9F9F9] rounded-2xl p-8 border border-[#E5E7EB]">
          <p className="text-sm text-[#4A7080] mb-6">
            Vi trenger din kontaktinformasjon for å registrere flytting i våre systemer.
          </p>

          <div className="space-y-6">
            {/* Owner Type */}
            <div>
              <label className="block text-sm font-semibold text-[#003C46] mb-2">
                Eier eller leier du boligen din? <span className="text-[#FF8278]">*</span>
              </label>
              <select
                name="ownerType"
                value={formData.ownerType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] font-medium focus:outline-none focus:ring-2 focus:ring-[#003C46]"
              >
                <option>Eier</option>
                <option>Leier</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#003C46] mb-2">
                Navn <span className="text-[#FF8278]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Navn"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
              />
            </div>

            {/* Customer Number */}
            <div>
              <label className="block text-sm font-semibold text-[#003C46] mb-2">
                Kundenummer
              </label>
              <input
                type="text"
                name="customerNumber"
                value={formData.customerNumber}
                onChange={handleInputChange}
                placeholder="Kundenummer"
                className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Postal Code */}
              <div>
                <label className="block text-sm font-semibold text-[#003C46] mb-2">
                  Postnummer <span className="text-[#FF8278]">*</span>
                </label>
                <input
                  type="number"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  placeholder="Postnummer"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#003C46] mb-2">
                  E-post
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="E-post"
                  className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-[#003C46] mb-2">
                Adresse <span className="text-[#FF8278]">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Adresse"
                required
                className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Post Location */}
              <div>
                <label className="block text-sm font-semibold text-[#003C46] mb-2">
                  Poststed <span className="text-[#FF8278]">*</span>
                </label>
                <input
                  type="text"
                  name="postLocation"
                  value={formData.postLocation}
                  onChange={handleInputChange}
                  placeholder="Poststed"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#003C46] mb-2">
                  Telefonnummer <span className="text-[#FF8278]">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Telefonnummer"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
                />
              </div>
            </div>

            {/* Move Date */}
            <div>
              <label className="block text-sm font-semibold text-[#003C46] mb-2">
                Dato for flytting
              </label>
              <input
                type="date"
                name="moveDate"
                value={formData.moveDate}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-[#DCDCDC] bg-white text-[#003C46] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#003C46]"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#003C46] text-white px-8 py-3 font-semibold transition-all ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-[#1A5060] hover:scale-[1.02] shadow-md"
                }`}
              >
                {isSubmitting ? "Sender..." : "Neste"}
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Required Fields Note */}
          <p className="text-xs text-[#4A7080] mt-6">
            * Påkrevd felt
          </p>

          {/* Success Message */}
          {submitted && (
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="font-bold">Takk! Vi har mottatt din flyttemelding.</p>
              <p className="text-sm mt-1">Henvendelsen er sendt til post@mktv.no. Vi behandler saken i våre åpningstider.</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="font-bold">Beklager, det oppsto en feil.</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
