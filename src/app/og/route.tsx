import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { portfolio } from "@/content/portfolio";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const titleParam = searchParams.get("title");
  const eyebrowParam = searchParams.get("eyebrow");
  const descriptionParam = searchParams.get("description");

  const title = titleParam ?? portfolio.owner.name;
  const eyebrow = eyebrowParam ?? portfolio.owner.title;
  const description = descriptionParam ?? portfolio.owner.statement;

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "flex-start",
          background:
            "linear-gradient(135deg, #05070d 0%, #111827 55%, #042f2e 100%)",
          color: "white",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
          flexDirection: "column"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 1000 }}>
          <div
            style={{
              color: "#67e8f9",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              fontWeight: 600
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontSize: title.length > 40 ? 64 : 78,
              fontWeight: 800,
              letterSpacing: -1,
              lineHeight: 1.05
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "#d1d5db",
              fontSize: 28,
              lineHeight: 1.4,
              maxWidth: 1000,
              marginTop: 8
            }}
          >
            {description}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginTop: 24,
              color: "#9ca3af",
              fontSize: 22
            }}
          >
            <span style={{ color: "#67e8f9", fontWeight: 600 }}>
              {portfolio.owner.name}
            </span>
            <span>·</span>
            <span>{portfolio.owner.location}</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630
    }
  );
}
