import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Card } from "@/components/ui/Card";
import { CapabilityIcon } from "@/components/ui/CapabilityIcon";
import type { Capabilities as CapabilitiesContent } from "@/lib/content";

type Props = {
  id: string;
  eyebrow: string;
  data: CapabilitiesContent;
  columns?: 2 | 3;
};

export function Capabilities({ id, eyebrow, data, columns = 3 }: Props) {
  return (
    <Section id={id} eyebrow={eyebrow} title={data.title} intro={data.intro}>
      <div className={columns === 3 ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2"}>
        {data.items.map((item, i) => (
          <Reveal key={item.title} delay={(i % 3) * 0.06}>
            <Card className="h-full">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-blue">
                <CapabilityIcon name={item.icon} />
              </div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
