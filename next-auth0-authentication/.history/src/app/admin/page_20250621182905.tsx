import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1>Gizli Sayfa — Hoş geldin {session?.user?.name}</h1>
      <a href="/api/auth/signout" className="underline text-blue-600">
        Çıkış Yap
      </a>
    </main>
  );
}
