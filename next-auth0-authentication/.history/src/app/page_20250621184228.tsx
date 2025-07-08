"use client";

import { useSession, signIn } from "next-auth/react";
import AuthButton from "@/components/AuthButton";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center space-y-4">
        {session ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-800">
              Merhaba, {session.user?.name}
            </h1>
            <AuthButton />
          </>
        ) : (
          <>
            <h1 className="text-xl font-medium text-gray-700">
              Giriş yapmak için butona tıkla
            </h1>
            <button
              onClick={() => signIn("auth0")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Giriş Yap
            </button>
          </>
        )}
      </div>
    </main>
  );
}
