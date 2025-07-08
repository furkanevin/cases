import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function WelcomeMessage() {
  const session = await getServerSession(authOptions);

  return <h1>Merhaba, {session?.user?.name}</h1>;
}
