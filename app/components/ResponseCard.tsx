"use client";

type ResponseCardProps = {
  message: string | null;
  error: string | null;
  secretKey: string | null;
};

export default function ResponseCard({ message, error, secretKey }: ResponseCardProps) {
  if (!message && !error) return null;

  return (
    <div
      className="animate-fade-in-up"
      style={{
        marginTop: "32px",
        borderRadius: "12px",
        border: error
          ? "1px solid rgba(255, 92, 92, 0.4)"
          : "1px solid var(--border-glow)",
        backgroundColor: error
          ? "rgba(255, 92, 92, 0.05)"
          : "rgba(168, 255, 62, 0.04)",
        padding: "24px 28px",
        maxWidth: "480px",
        width: "100%",
      }}
    >
      {error ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
          <span style={{ fontSize: "18px" }}>⚠️</span>
          <div>
            <p style={{ fontSize: "13px", color: "var(--red)", fontWeight: 600, marginBottom: "4px" }}>
              Error
            </p>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{error}</p>
          </div>
        </div>
      ) : (
        <div>
          <p
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "20px",
              lineHeight: 1.4,
            }}
          >
            {message}
          </p>

          {secretKey && (
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <p style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                Secret resolved from Infisical
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  backgroundColor: "var(--bg-primary)",
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-geist-mono)",
                }}
              >
                <span style={{ fontSize: "12px", color: "var(--accent)" }}>$</span>
                <span style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  {secretKey}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
