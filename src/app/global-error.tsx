"use client";

/**
 * Last-resort boundary for failures in the root layout itself.
 * Renders its own <html> shell with inline styles because the
 * global stylesheet may not be available in this failure mode.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf7f2",
          color: "#171512",
          fontFamily: "Georgia, serif",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <div>
          <h1 style={{ fontSize: "2rem", fontWeight: 500 }}>
            The Slayton Service
          </h1>
          <p style={{ marginTop: "1rem", fontSize: "1.05rem" }}>
            The site hit an unexpected problem. Please try again, or call
            (615)&nbsp;920-3891 — a real person answers.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "1.5rem",
              padding: "0.8rem 2rem",
              borderRadius: "999px",
              border: "none",
              background: "#c19a52",
              color: "#0e0d0b",
              fontSize: "0.9rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
