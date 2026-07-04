import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  className?: string;
  children: React.ReactNode;
};

export function Section({ id, eyebrow, title, intro, className, children }: Props) {
  return (
    <section
      id={id}
      className={cn("relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32", className)}
    >
      {(eyebrow || title) && (
        <header className="mb-12 max-w-2xl">
          {eyebrow && (
            <p className="mb-3 font-mono text-sm tracking-widest uppercase text-cyan">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-balance">
              {title}
            </h2>
          )}
          {intro && <p className="mt-4 text-muted text-lg leading-relaxed">{intro}</p>}
        </header>
      )}
      {children}
    </section>
  );
}
