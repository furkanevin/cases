"use client";

import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f1115] px-4">
      <div className="bg-[#0a0c10] rounded-2xl p-8 min-w-[300px] text-center space-y-4">
        {session ? (
          <>
            <h1 className="text-2xl font-semibold text-white">
              Merhaba, {session.user?.name}
            </h1>
            <AuthButton />
          </>
        ) : (
          <>
            <h1 className="text-xl font-medium text-white">
              Giriş yapmak için tıkla
            </h1>
            <AuthButton />
          </>
        )}
      </div>
    </main>
  );
}
