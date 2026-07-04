"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; ignore
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-mono text-sm text-muted transition-colors hover:border-blue hover:text-ink"
      aria-live="polite"
    >
      {copied ? "Copied!" : email}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        {copied ? (
          <path d="m5 12 5 5L20 7" />
        ) : (
          <path d="M8 8h12v12H8V8Zm-4 8V4h12" />
        )}
      </svg>
    </button>
  );
}
