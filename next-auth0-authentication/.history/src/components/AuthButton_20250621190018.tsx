"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="bg-[#f44f1c] text-white rounded-lg font-medium py-3 px-6 rounded-md shadow-lg hover:bg-[#e64510] transition-all"
    >
      Çıkış Yap
    </button>
  ) : (
    <button
      onClick={() => signIn("auth0")}
      className="bg-[#f44f1c] text-white rounded-lg font-medium py-3 px-6  shadow-lg hover:bg-[#e64510] transition-all"
    >
      Sign in with Auth0
    </button>
  );
}
