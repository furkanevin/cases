import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  // Eğer session yoksa direkt login sayfasına yönlendir
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="min-h-screen flex-col items-center justify-center gap-4">
      <h1> Hoş geldin {session?.user?.name}</h1>
      <a
        href="/api/auth/signout?callbackUrl=/"
        className="underline text-blue-600"
      >
        Çıkış Yap
      </a>
    </main>
  );
}
