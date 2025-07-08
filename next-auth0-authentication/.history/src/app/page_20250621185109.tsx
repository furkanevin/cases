"use client";

import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold">Merhaba, {user?.name}</h1>
      <AuthButton />
    </main>
  );
}
