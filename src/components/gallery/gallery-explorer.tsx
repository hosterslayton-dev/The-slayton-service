"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { BeforeAfterSlider } from "@/components/media/before-after-slider";
import { ImageGallery } from "@/components/media/image-gallery";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { FilterGroup } from "@/components/ui/filter-group";
import { SearchInput } from "@/components/ui/search-input";
import { galleryItems, getGalleryCategories } from "@/config/gallery";
import { getServiceBySlug, type Service } from "@/config/services";

/**
 * ─────────────────────────────────────────────────────────────────
 * GALLERY EXPLORER (Phase 6)
 *
 * Client-side filtering over the typed gallery config: category
 * chips (aria-pressed), search across title/city/category, a
 * before/after row of comparison sliders, and the masonry photo
 * grid with the dialog lightbox. Results are announced politely;
 * an empty result offers a clear reset. Images lazy-load via
 * next/image; motion collapses under prefers-reduced-motion.
 * ─────────────────────────────────────────────────────────────────
 */
export function GalleryExplorer() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const categories = getGalleryCategories();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return galleryItems.filter((item) => {
      const inCategory =
        selectedCategories.length === 0 || selectedCategories.includes(item.category);
      const inQuery =
        q === "" ||
        [item.title, item.city ?? "", item.category]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return inCategory && inQuery;
    });
  }, [selectedCategories, query]);

  const pairs = filtered.filter((item) => item.type === "beforeAfter");
  const photos = filtered.filter((item) => item.type === "image");
  const hasSamples = filtered.some((item) => item.sample);

  // Gallery → services: the unique catalog services behind the
  // visible work, so visitors can step from photography straight to
  // the matching service page.
  const relatedServices = useMemo(() => {
    const map = new Map<string, Service>();
    for (const item of filtered) {
      if (!item.serviceSlug) continue;
      const service = getServiceBySlug(item.serviceSlug);
      if (service) map.set(service.slug, service);
    }
    return [...map.values()];
  }, [filtered]);

  const reset = () => {
    setSelectedCategories([]);
    setQuery("");
  };

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <FilterGroup
          label="Filter by category"
          options={categories.map((category) => ({ value: category, label: category }))}
          selected={selectedCategories}
          onChange={setSelectedCategories}
          className="flex-1"
        />
        <SearchInput
          label="Search the gallery"
          placeholder="Search by service, city…"
          onSearch={setQuery}
          className="w-full lg:max-w-xs"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p aria-live="polite" className="text-sm text-charcoal-600">
          {filtered.length} {filtered.length === 1 ? "item" : "items"}
          {query ? ` matching “${query}”` : ""}
        </p>
        {hasSamples ? (
          <Badge tone="warning">Sample placeholders — real project photography coming</Badge>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-10"
          title="Nothing matches those filters"
          description="Try a different category or clear the search."
          action={
            <Button variant="outline" onClick={reset}>
              Clear Filters
            </Button>
          }
        />
      ) : (
        <>
          {pairs.length > 0 ? (
            <div className="mt-10">
              <h2 className="font-display text-display-sm text-ink-900">
                Before &amp; After
              </h2>
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {pairs.map((item) => {
                  const service = item.serviceSlug
                    ? getServiceBySlug(item.serviceSlug)
                    : undefined;
                  return (
                    <figure key={item.id}>
                      <BeforeAfterSlider pair={item.pair} />
                      <figcaption className="mt-3 text-sm text-charcoal-600">
                        {item.title}
                        {item.city ? ` · ${item.city}` : ""}
                        {service ? (
                          <>
                            {" · "}
                            <Link
                              href={`/services/${service.slug}`}
                              className="font-medium text-gold-700 underline decoration-gold-500/40 underline-offset-4 transition-colors hover:decoration-gold-600"
                            >
                              {service.name}
                            </Link>
                          </>
                        ) : null}
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          ) : null}

          {photos.length > 0 ? (
            <div className="mt-12">
              {pairs.length > 0 ? (
                <h2 className="mb-6 font-display text-display-sm text-ink-900">
                  Project Photos
                </h2>
              ) : null}
              <ImageGallery
                layout="masonry"
                images={photos.map((item) => item.image)}
              />
            </div>
          ) : null}

          {relatedServices.length > 0 ? (
            <div className="mt-14 border-t border-tan-200 pt-8">
              <p className="eyebrow">The services behind this work</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedServices.map((service) => (
                  <Button
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    {service.name}
                  </Button>
                ))}
              </div>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
