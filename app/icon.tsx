import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8f6f1",
          color: "#1a1614",
          fontSize: 20,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        M
      </div>
    ),
    size
  );
}
