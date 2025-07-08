import AuthButton from "@/components/AuthButton";
import WelcomeMessage from "@/components/WelcomeMessage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <WelcomeMessage />
      <AuthButton />
    </main>
  );
}
