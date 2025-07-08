// app/layout.tsx
import { SessionProvider } from "next-auth/react";
import "./globals.css"; // varsa global stiller

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
