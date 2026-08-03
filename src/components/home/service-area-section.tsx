import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/sections/section-heading";
import { ServiceAreaMapVisual } from "./service-area-map";
import { serviceAreaMap } from "@/config/homepage";

/** Service-area band: server wrapper, client map visual inside. */
export function ServiceAreaSection() {
  return (
    <Section tone="dark" id="service-area" className="scroll-mt-header">
      <Container>
        <SectionHeading
          eyebrow={serviceAreaMap.eyebrow}
          title={serviceAreaMap.title}
          lede={serviceAreaMap.lede}
          onDark
        />
        <div className="mt-12">
          <ServiceAreaMapVisual />
        </div>
      </Container>
    </Section>
  );
}
