"use client";
"use client";
import { useSession, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111", // koyu arka plan
          color: "#fff",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem" }}>Merhaba, {session.user?.name}</h2>
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#fff",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => signOut()}
        >
          Çıkış Yap
        </button>
      </div>
    );
  }

  return null;
}
