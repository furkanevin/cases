"use client";

import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full space-y-6 text-center">
        {session ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900">
              Merhaba, {session.user?.name}
            </h1>
            <AuthButton />
          </>
        ) : (
          <>
            <h1 className="text-xl font-medium text-gray-700">
              Giriş yapmak için aşağıdaki butonu kullan
            </h1>
            <AuthButton />
          </>
        )}
      </div>
    </main>
  );
}
