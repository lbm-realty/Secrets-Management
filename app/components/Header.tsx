export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo / brand */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              backgroundColor: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#0d0f12",
                fontFamily: "var(--font-geist-mono)",
              }}
            >
              IS
            </span>
          </div>
          <span
            style={{
              fontSize: "15px",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "0.01em",
            }}
          >
            infisical-secret-greeter
          </span>
        </div>

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--accent)",
            }}
          />
          <span
            style={{
              fontSize: "12px",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-geist-mono)",
            }}
          >
            secrets live
          </span>
        </div>
      </div>
    </header>
  );
}
