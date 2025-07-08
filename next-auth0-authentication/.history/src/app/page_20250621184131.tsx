"use client";

import AuthButton from "@/components/AuthButton";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      {session ? (
        <>
          <h1>Merhaba, {session.user?.name}</h1>
          <AuthButton />
        </>
      ) : (
        <AuthButton />
      )}
    </main>
  );
}
