"use client";

import { SessionProvider } from "next-auth/react";
import "../app/globals.css";
export default function SessionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
