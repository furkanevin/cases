"use client";

import { useSession, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Çıkış Yap</button>;
  }

  return <div>Çıkış yapıldı</div>;
}
