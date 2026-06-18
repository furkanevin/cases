import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReduxProvider from "@/components/providers/ReduxProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "E-Shop - Your Trusted E-Commerce Platform",
    template: "%s | E-Shop",
  },
  description:
    "Discover amazing products at unbeatable prices. From electronics to fashion, we have the best selection of quality products for you.",
  keywords: ["e-commerce", "shopping", "products", "electronics", "fashion", "jewelry"],
  authors: [{ name: "E-Shop Team" }],
  creator: "E-Shop",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://e-shop.com",
    title: "E-Shop - Your Trusted E-Commerce Platform",
    description:
      "Discover amazing products at unbeatable prices. From electronics to fashion, we have the best selection of quality products for you.",
    siteName: "E-Shop",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Shop - Your Trusted E-Commerce Platform",
    description:
      "Discover amazing products at unbeatable prices. From electronics to fashion, we have the best selection of quality products for you.",
    creator: "@eshop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
