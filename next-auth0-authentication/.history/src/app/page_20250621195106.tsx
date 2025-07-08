import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton"; // 👈 bunu ekle

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1>Hoş geldin {session?.user?.name}</h1>
      <AuthButton />
    </main>
  );
}
