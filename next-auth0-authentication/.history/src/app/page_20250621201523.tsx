import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AuthButton from "@/components/AuthButton";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 text-gray-900">
      <div className="bg-white p-10 rounded-2xl shadow-md text-center space-y-4">
        <h1 className="text-2xl font-semibold">
          Hoş geldin {session?.user?.name}
        </h1>
        <AuthButton />
      </div>
    </main>
  );
}
