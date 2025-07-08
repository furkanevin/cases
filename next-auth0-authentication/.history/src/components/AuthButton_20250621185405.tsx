"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="bg-orange-600 text-white py-3 px-6 rounded-md w-full"
    >
      Çıkış Yap
    </button>
  ) : (
    <button
      onClick={() => signIn("auth0")}
      className="bg-orange-600 text-white py-3 px-6 rounded-md w-full"
    >
      Sign in with Auth0
    </button>
  );
}
