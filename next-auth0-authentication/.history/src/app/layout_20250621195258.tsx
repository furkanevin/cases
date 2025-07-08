import SessionWrapper from "../components/SessionProvider";
import "@/app/globals.css"; // mutlaka var olmalı
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  );
}
