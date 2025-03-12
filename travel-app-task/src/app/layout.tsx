import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FilterProvider } from "@/context/filter-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Travel App",
  description: "Find and book tours, tickets, rentals, and transfers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FilterProvider>
          {children}
        </FilterProvider>
      </body>
    </html>
  );
} 