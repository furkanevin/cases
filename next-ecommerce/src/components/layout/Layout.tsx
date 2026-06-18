"use client";

import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Toast from "@/components/ui/Toast";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Toast />
    </div>
  );
}
