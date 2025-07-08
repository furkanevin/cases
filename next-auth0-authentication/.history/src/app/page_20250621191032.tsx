"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    signIn("auth0"); // Auth0 yerine hangi provider varsa onu yaz
  };

  return session ? (
    <button
      onClick={handleSignOut}
      className="bg-[#f44f1c] text-white text-lg rounded-lg font-medium px-6 py-3 hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Çıkış Yap
    </button>
  ) : (
    <button
      onClick={() => signIn("auth0")}
      className="bg-[#f44f1c] text-white text-lg rounded-lg font-medium px-6 py-3 hover:bg-[#e64510] transition-all cursor-pointer"
    >
      Giriş Yap
    </button>
  );
}
