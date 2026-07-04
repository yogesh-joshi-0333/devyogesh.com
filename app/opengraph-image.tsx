import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0a0a0f 0%, #101024 60%, #0a0a0f 100%)",
          color: "#f4f4f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#22d3ee", letterSpacing: 6 }}>
          DEVYOGESH.COM
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          I build intelligent systems that ship.
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 32, color: "#9b9ba6" }}>
          Yogesh Joshi · Senior AI &amp; Software Engineer
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 8,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #22d3ee)",
          }}
        />
      </div>
    ),
    size
  );
}
