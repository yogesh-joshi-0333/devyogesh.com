import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <Section id="contact" className="pb-32">
      <Reveal>
        <div className="gradient-border relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
          <div className="aurora" aria-hidden />
          <div className="relative">
            <p className="font-mono text-sm tracking-widest uppercase text-cyan">Contact</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl text-balance">
              Let&apos;s build something intelligent together.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-muted leading-relaxed">
              Open to senior AI engineering roles, consulting, and ambitious product collaborations.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton href={`mailto:${site.email}`}>Email me</MagneticButton>
              <CopyEmail email={site.email} />
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted">
              <a href={site.socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">GitHub</a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">LinkedIn</a>
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
