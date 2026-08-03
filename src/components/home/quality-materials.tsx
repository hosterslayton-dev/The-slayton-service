import Image from "next/image";
import { SectionHeading } from "@/components/sections/section-heading";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  materialCategories,
  materialsDisclaimer,
  type MaterialManufacturer,
} from "@/config/materials";

/**
 * ─────────────────────────────────────────────────────────────────
 * QUALITY MATERIALS — homepage trust section
 *
 * Sits beneath "Proudly Partnering With". Server component, zero
 * client JavaScript: a quiet ledger of manufacturer categories with
 * each name linking to the manufacturer's official site in a new
 * tab. Content lives entirely in src/config/materials.ts.
 *
 * Marks render as restrained typographic wordmarks (muted, resolving
 * to full ink with the gold underline on hover/focus — the partner
 * motif) unless an official logo asset is configured, in which case
 * the artwork renders with the same grayscale-to-color treatment.
 * The disclaimer below the ledger keeps the claim precise. The
 * section self-hides if the category list is ever emptied.
 * ─────────────────────────────────────────────────────────────────
 */

function ManufacturerMark({ manufacturer }: { manufacturer: MaterialManufacturer }) {
  return (
    <a
      href={manufacturer.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${manufacturer.name} — visit website (opens in a new tab)`}
      className={
        "group relative inline-flex min-h-11 items-center px-1 " +
        "after:absolute after:inset-x-1 after:bottom-1.5 after:h-px after:origin-center " +
        "after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-500 " +
        "after:ease-premium hover:after:scale-x-100 focus-visible:after:scale-x-100"
      }
    >
      {manufacturer.logo ? (
        <Image
          src={manufacturer.logo.src}
          alt=""
          width={manufacturer.logo.width}
          height={manufacturer.logo.height}
          loading="lazy"
          sizes="160px"
          unoptimized={manufacturer.logo.src.endsWith(".svg")}
          className={
            "h-8 w-auto opacity-70 grayscale select-none " +
            "transition-[filter,opacity] duration-500 ease-premium " +
            "group-hover:opacity-100 group-hover:grayscale-0 " +
            "group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
          }
        />
      ) : (
        <span
          className={
            "font-display text-xl text-charcoal-500 transition-colors " +
            "duration-500 ease-premium group-hover:text-ink-900 " +
            "group-focus-visible:text-ink-900"
          }
        >
          {manufacturer.name}
        </span>
      )}
    </a>
  );
}

export function QualityMaterials() {
  if (materialCategories.length === 0) return null;

  return (
    <Section tone="light" className="border-b border-tan-200 py-14 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Built To Last"
          title="Quality Materials From America's Most Trusted Manufacturers"
          lede="The right product, honestly specified for your home — sourced from names builders and homeowners already know."
        />
        <div className="mx-auto mt-12 max-w-4xl divide-y divide-tan-200 border-y border-tan-200">
          {materialCategories.map((category) => (
            <div
              key={category.key}
              className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:gap-8"
            >
              <h3 className="w-44 shrink-0 font-nav text-xs font-semibold tracking-label text-charcoal-600 uppercase">
                {category.label}
              </h3>
              <div className="flex flex-wrap items-center gap-x-7 gap-y-1">
                {category.manufacturers.map((manufacturer) => (
                  <ManufacturerMark
                    key={manufacturer.name}
                    manufacturer={manufacturer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-charcoal-500">
          {materialsDisclaimer}
        </p>
      </Container>
    </Section>
  );
}
