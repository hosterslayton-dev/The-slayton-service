import Image from "next/image";
import { ProjectCard } from "@/components/cards/project-card";
import { BeforeAfterSlider } from "@/components/media/before-after-slider";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { sampleBeforeAfter, sampleProjects } from "@/config/homepage";

/**
 * ─────────────────────────────────────────────────────────────────
 * FEATURED PROJECTS — expanded preview (Phase 5)
 *
 * Interactive cards with a before/after hover reveal: each card's
 * media cross-fades from "before" to "after" on hover/focus —
 * pure CSS opacity (GPU-friendly; instant swap under reduced
 * motion). Location + service shown on every card; the working
 * comparison slider closes the section. Sample content is visibly
 * badged; the grid consumes ProjectRecord-shaped data when the
 * Project Library ships.
 * ─────────────────────────────────────────────────────────────────
 */

function BeforeAfterHover({ altBase }: { altBase: string }) {
  return (
    <span className="absolute inset-0 block">
      <Image
        src={sampleBeforeAfter.before.src}
        alt={`${altBase} — before (placeholder)`}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover"
      />
      <Image
        src={sampleBeforeAfter.after.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover opacity-0 transition-opacity duration-700 ease-premium group-hover:opacity-100 group-focus-within:opacity-100"
      />
      <span className="absolute right-3 bottom-3 rounded-pill bg-ink-950/70 px-2.5 py-1 font-nav text-[0.65rem] tracking-nav text-cream-100 uppercase backdrop-blur-sm">
        <span className="group-hover:hidden">Before</span>
        <span className="hidden group-hover:inline">After</span>
      </span>
    </span>
  );
}

export function FeaturedProjects() {
  return (
    <Section tone="light" id="featured-projects" className="scroll-mt-header">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <Badge tone="warning">Sample Preview — real projects coming soon</Badge>
          <SectionHeading
            eyebrow="Our Work"
            title="Craftsmanship you can walk through"
            lede="Every completed project will live here permanently — the goals, the honest findings, the work, and the result. Hover any card to preview the change."
          />
        </div>

        <ul className="mt-12 grid list-none gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sampleProjects.map((project, index) => (
            <Reveal as="li" key={project.title} delay={Math.min(index, 5) * 90}>
              <ProjectCard
                title={project.title}
                summary={project.summary}
                serviceName={project.serviceName}
                city={project.city}
                media={<BeforeAfterHover altBase={project.title} />}
                className="h-full"
              />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mx-auto mt-14 max-w-2xl">
          <BeforeAfterSlider pair={sampleBeforeAfter} />
        </Reveal>
      </Container>
    </Section>
  );
}
