const paths: Record<string, React.ReactNode> = {
  sparkles: <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m14.5-6.5-2 2m-7 7-2 2m11 0-2-2m-7-7-2-2M12 8l1.2 2.8L16 12l-2.8 1.2L12 16l-1.2-2.8L8 12l2.8-1.2Z" />,
  network: <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm-7 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 5v6m0 0-6 6m6-6 6 6" />,
  search: <path d="m21 21-4.35-4.35M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z" />,
  plug: <path d="M9 7V2m6 5V2M8 7h8v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4V7Zm4 8v7" />,
  terminal: <path d="m4 17 6-6-6-6m8 14h8" />,
  cpu: <path d="M9 9h6v6H9V9Zm-4 3H2m20 0h-3M12 5V2m0 20v-3M5 5h14v14H5V5Z" />,
  gauge: <path d="m12 14 4-4M3.34 19a10 10 0 1 1 17.32 0H3.34Z" />,
  workflow: <path d="M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm-4-4 4 4M7 10v4a3 3 0 0 0 3 3h1" />,
  mic: <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V5a3 3 0 0 1 3-3Zm7 9a7 7 0 0 1-14 0m7 7v4" />,
  rocket: <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09ZM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z" />,
  blocks: <path d="M3 3h7v7H3V3Zm11 0h7v7h-7V3ZM3 14h7v7H3v-7Zm11 0h7v7h-7v-7Z" />,
  server: <path d="M3 4h18v6H3V4Zm0 10h18v6H3v-6Zm4-7h.01M7 17h.01" />,
  layout: <path d="M3 3h18v18H3V3Zm0 6h18M9 21V9" />,
  database: <path d="M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3Zm9 4c0 1.66-4.03 3-9 3s-9-1.34-9-3m18 7c0 1.66-4.03 3-9 3s-9-1.34-9-3V5m18 0v14" />,
  cloud: <path d="M17.5 19a4.5 4.5 0 1 0-.42-8.98 6 6 0 1 0-11.06 3.1A3.5 3.5 0 0 0 7 19.5h10.5Z" />,
  users: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m22 0v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" />,
};

export function CapabilityIcon({ name }: { name: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] ?? paths.sparkles}
    </svg>
  );
}
