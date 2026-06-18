"use client";

import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import Button from "@/components/ui/Button";
import { useTranslations } from "next-intl";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("common");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="text-6xl">⚠️</div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Something went wrong!</h1>
            <p className="text-muted-foreground">We encountered an error while loading this page.</p>
          </div>
          <div className="space-y-3">
            <Button onClick={reset} className="w-full">
              Try Again
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = "/")} className="w-full">
              Go Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
