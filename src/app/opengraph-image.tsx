import { ImageResponse } from "next/og";

export const alt = "Retail Soft - Software Built Around Your Business.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "linear-gradient(135deg,#0A7B4B,#053D26)", color: "white", padding: 80, position: "relative", fontFamily: "sans-serif" }}>
        <div style={{ position: "absolute", right: -120, top: 60, width: 640, height: 640, borderRadius: 9999, border: "2px solid rgba(255,255,255,0.18)", display: "flex" }} />
        <div style={{ position: "absolute", right: -40, top: 140, width: 480, height: 480, borderRadius: 9999, border: "2px solid rgba(244,180,0,0.45)", display: "flex" }} />
        <div style={{ position: "absolute", right: 120, top: 245, width: 160, height: 160, borderRadius: 36, background: "#E3432B", border: "3px solid #ffffff", display: "flex" }} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ fontSize: 30, color: "#F4B400", letterSpacing: 4, display: "flex" }}>RETAIL SOFT</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 760 }}>
            <span>Software Built</span>
            <span>Around Your</span>
            <span style={{ color: "#F4B400" }}>Business.</span>
          </div>
          <div style={{ fontSize: 26, color: "rgba(255,255,255,0.85)", display: "flex" }}>ERP · POS · Inventory · SaaS · E-commerce</div>
        </div>
      </div>
    ),
    size,
  );
}
