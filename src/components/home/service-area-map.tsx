"use client";

import { serviceAreaMap } from "@/config/homepage";

export function ServiceAreaMapVisual() {
  const { cities, counties } = serviceAreaMap;
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
      <div className="relative overflow-hidden rounded-card border border-cream-100/15 bg-ink-900 shadow-card">
        <iframe
          title="The Slayton Service area map centered on Nashville, Tennessee"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-88.95%2C34.78%2C-84.20%2C37.55&layer=mapnik&marker=36.1627%2C-86.7816"
          className="h-[470px] w-full border-0 grayscale-[20%] contrast-[105%]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-ink-950/10" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-400/70 bg-gold-400/10 shadow-[0_0_45px_rgba(193,154,82,.28)] sm:h-[420px] sm:w-[420px]" />
        <div className="absolute bottom-4 left-4 right-4 rounded-field bg-ink-950/85 px-4 py-3 text-sm text-cream-100 backdrop-blur-md">
          <strong className="text-gold-300">Approximate two-hour service radius from Nashville.</strong> Final availability depends on project scope, scheduling, and travel conditions.
        </div>
      </div>
      <div>
        <h3 className="font-display text-display-sm text-cream-100">Middle Tennessee and surrounding communities</h3>
        <p className="mt-3 text-sm leading-relaxed text-cream-100/65">The map gives homeowners real geographic context instead of disconnected city dots. Ask about your location even when it is not listed.</p>
        <ul className="mt-6 grid list-none grid-cols-2 gap-2">
          {cities.map((city) => <li key={city.name} className="flex min-h-11 items-center gap-2 rounded-field bg-cream-100/5 px-3 text-sm text-cream-100/80"><span className="h-1.5 w-1.5 rounded-full bg-gold-300" />{city.name}</li>)}
        </ul>
        <p className="mt-6 font-nav text-xs font-semibold tracking-label text-cream-100/50 uppercase">Core counties</p>
        <div className="mt-3 flex flex-wrap gap-2">{counties.map((county) => <span key={county} className="rounded-pill border border-gold-300/30 px-4 py-2 font-nav text-xs text-gold-300">{county}</span>)}</div>
        <p className="mt-6 text-sm text-cream-100/60">Call <a href="tel:+16159203891" className="text-gold-300 underline underline-offset-4">(615) 920-3891</a> to confirm availability for your property.</p>
      </div>
    </div>
  );
}
