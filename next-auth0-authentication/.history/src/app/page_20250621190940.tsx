"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn("auth0"); // Auth0 değilse provider adını değiştir
    }
  }, [status]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#fff] px-4">
      <div className="bg-[#fff] rounded-2xl p-8 min-w-[300px] text-center space-y-4">
        {session && (
          <>
            <h1 className="text-2xl font-semibold text-black">
              Merhaba, {session.user?.name}
            </h1>
            <AuthButton />
          </>
        )}
      </div>
    </main>
  );
}
