"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Çıkış Yap</button>;
  }

  return <button onClick={() => signIn("auth0")}>Giriş Yap</button>;
}
