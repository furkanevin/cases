import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Gizli Sayfa — Hoş geldin {session?.user?.name}</h1>
    </div>
  );
}
<a href="/api/auth/signout" className="mt-4 underline text-blue-600">
  Çıkış Yap
</a>;
