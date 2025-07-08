"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin"); // Oturum yoksa login sayfasına yönlendir
    }
  }, [status, router]);

  if (status === "loading") return null;

  if (session) {
    return <button onClick={() => signOut()}>Çıkış Yap</button>;
  }

  return null;
}
