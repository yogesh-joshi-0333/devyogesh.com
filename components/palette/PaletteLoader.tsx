"use client";

import dynamic from "next/dynamic";

const CommandPalette = dynamic(
  () => import("@/components/palette/CommandPalette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function PaletteLoader({ projects }: { projects: { slug: string; title: string }[] }) {
  return <CommandPalette projects={projects} />;
}
