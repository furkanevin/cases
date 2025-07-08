"use client";

import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="h-screen w-screen flex items-center justify-center bg-[#f1f1f1]">
      <div className="bg-white rounded-2xl px-8 py-10 min-w-[300px] text-center space-y-4 shadow-lg">
        {session ? (
          <>
            <h1 className="text-2xl font-semibold text-black">
              Merhaba, {session.user?.name}
            </h1>
            <AuthButton />
          </>
        ) : (
          <>
            <h1 className="text-xl font-medium text-black">
              Giriş yapmak için tıkla
            </h1>
            <AuthButton />
          </>
        )}
      </div>
    </main>
  );
}
