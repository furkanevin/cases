"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Yükleniyor...</p>;
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1>Merhaba, {session.user?.name}</h1>
      <a href="/api/auth/signout">Çıkış Yap</a>
    </main>
  );
}
