"use client";

type GreetButtonProps = {
  type: "hi" | "bye";
  onClick: () => void;
  loading: boolean;
};

export default function GreetButton({ type, onClick, loading }: GreetButtonProps) {
  const isHi = type === "hi";

  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        position: "relative",
        padding: "14px 32px",
        borderRadius: "10px",
        fontSize: "15px",
        fontWeight: 600,
        cursor: loading ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        border: isHi
          ? "1px solid var(--accent)"
          : "1px solid var(--border)",
        backgroundColor: isHi ? "var(--accent)" : "var(--bg-card)",
        color: isHi ? "#0d0f12" : "var(--text-primary)",
        opacity: loading ? 0.6 : 1,
        minWidth: "140px",
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          const el = e.currentTarget;
          if (isHi) {
            el.style.backgroundColor = "var(--accent-dim)";
          } else {
            el.style.backgroundColor = "var(--bg-card-hover)";
            el.style.borderColor = "var(--text-muted)";
          }
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        if (isHi) {
          el.style.backgroundColor = "var(--accent)";
        } else {
          el.style.backgroundColor = "var(--bg-card)";
          el.style.borderColor = "var(--border)";
        }
      }}
    >
      {loading ? (
        <span style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center" }}>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            style={{ animation: "spin 0.7s linear infinite" }}
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
          Fetching...
        </span>
      ) : (
        <span>
          {isHi ? "👋  Say Hi" : "👋  Say Bye"}
        </span>
      )}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
}
