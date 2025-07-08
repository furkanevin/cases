"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="bg-[#fff] text-white border-3 text-lg rounded-lg m-3 pt-9 hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Çıkış Yap
    </button>
  ) : (
    <button
      onClick={() => signIn("auth0")}
      className="bg-white text-white  border-white rounded-lg p-10 hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Sign in with Auth0
    </button>
  );
}
