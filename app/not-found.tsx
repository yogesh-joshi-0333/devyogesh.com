import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-svh items-center justify-center overflow-hidden px-6">
      <div className="aurora" aria-hidden />
      <div className="relative text-center">
        <p className="font-mono text-sm tracking-widest uppercase text-cyan">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
          <span className="text-gradient">Signal lost.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted leading-relaxed">
          This page doesn&apos;t exist — or an agent refactored it away. Either way, the route
          returned nothing.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-blue hover:text-white"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
