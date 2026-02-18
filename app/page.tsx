"use client";

import { useState } from "react";
import Header from "./components/Header";
import GreetButton from "./components/GreetButton";
import ResponseCard from "./components/ResponseCard";

type ApiResponse = {
  message: string;
  secretKey: string;
};

export default function Home() {
  const [message, setMessage] = useState<string | null>(null);
  const [secretKey, setSecretKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<"hi" | "bye" | null>(null);

  const handleGreet = async (type: "hi" | "bye") => {
    setLoading(type);
    setMessage(null);
    setError(null);
    setSecretKey(null);

    try {
      const res = await fetch(`/api/greet?type=${type}`);
      const data: ApiResponse = await res.json();
      if (!res.ok) throw new Error((data as any).error || "Something went wrong");
      setMessage(data.message);
      setSecretKey(data.secretKey);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }}>
      <Header />

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "80px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Tag */}
        <div
          style={{
            marginBottom: "24px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "20px",
            border: "1px solid var(--border)",
            backgroundColor: "var(--bg-card)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#a8ff3e" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-geist-mono)" }}>
            powered by infisical
          </span>
        </div>

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            fontWeight: 700,
            textAlign: "center",
            lineHeight: 1.2,
            marginBottom: "16px",
            color: "var(--text-primary)",
          }}
        >
          Secret{" "}
          <span style={{ color: "var(--accent)" }}>Greeter</span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            maxWidth: "480px",
            textAlign: "center",
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "52px",
          }}
        >
          This app reads greeting values from{" "}
          <span style={{ color: "var(--accent)", fontWeight: 500 }}>Infisical</span>{" "}
          at runtime — no secrets hardcoded, no secrets in GitHub. Injected
          securely via GitHub Actions CI.
        </p>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
          <GreetButton type="hi" onClick={() => handleGreet("hi")} loading={loading === "hi"} />
          <GreetButton type="bye" onClick={() => handleGreet("bye")} loading={loading === "bye"} />
        </div>

        {/* Response */}
        <ResponseCard message={message} error={error} secretKey={secretKey} />

        {/* Info strip */}
        <div
          style={{
            marginTop: "72px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            width: "100%",
            maxWidth: "680px",
          }}
        >
          {[
            { icon: "🔐", title: "Zero hardcoded secrets", desc: "All values live in Infisical" },
            { icon: "⚙️", title: "GitHub Actions CI", desc: "Secrets injected at build + test time" },
            { icon: "🚀", title: "Deployed on Vercel", desc: "Runtime env vars from Infisical" },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "20px",
                borderRadius: "10px",
                border: "1px solid var(--border)",
                backgroundColor: "var(--bg-card)",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>{item.icon}</div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
                {item.title}
              </p>
              <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
