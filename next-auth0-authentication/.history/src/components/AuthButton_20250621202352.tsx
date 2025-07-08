"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      onClick={() => signOut()}
      className="bg-[#fff] text-white pb-52 border-1 pt-6 border-sky-500  hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Çıkış Yap
    </button>
  ) : (
    <button
      onClick={() => signIn("auth0")}
      className="bg-white text-whites border-white  hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Sign in with Auth0
    </button>
  );
}
