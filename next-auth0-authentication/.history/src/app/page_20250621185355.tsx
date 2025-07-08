"use client";

import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f1115] px-4">
      <div className="bg-[#0a0c10] rounded-2xl p-6">
        {session ? (
          <>
            <h1 className="text-2xl font-semibold text-white text-center mb-4">
              Merhaba, {session.user?.name}
            </h1>
            <AuthButton />
          </>
        ) : (
          <AuthButton />
        )}
      </div>
    </main>
  );
}
