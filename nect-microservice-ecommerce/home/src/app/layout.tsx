import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Header } from "@/components/Header";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Store - Home",
  description: "Browse our amazing collection of products",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-secondary-50">
            <Header />
            <main>{children}</main>
            <Toaster
              position="bottom-left"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "12px 16px",
                  fontSize: "14px",
                },
              }}
            />
          </div>
        </Providers>
      </body>
    </html>
  );
}
