"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
