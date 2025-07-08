"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="bg-[#f44f1c] text-white font-medium  text-lg p-10 shadow-lg hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Çıkış Yap
    </button>
  ) : (
    <button
      onClick={() => signIn("auth0")}
      className="bg-[#f44f1c] text-white rounded-lg font-medium p-10 hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Sign in with Auth0
    </button>
  );
}
