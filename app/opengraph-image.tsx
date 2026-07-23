import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#f8f6f1",
          color: "#1a1614",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontStyle: "italic",
            fontFamily: "Georgia, serif",
            marginBottom: 32,
          }}
        >
          {siteConfig.shortName}
        </div>
        <div
          style={{
            fontSize: 56,
            fontFamily: "Georgia, serif",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          Turning ideas into high-performance web products.
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#6b6560",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Full Stack Web Developer · Next.js · React
        </div>
      </div>
    ),
    size
  );
}
