"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname, useParams } from "next/navigation";
import { routing } from "@/i18n/routing";

export default function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const handleLanguageChange = (newLocale: string) => {
    // Get the current pathname without locale prefix
    const currentPathname = pathname.replace(`/${locale}`, "");

    // Build new URL with new locale
    let newUrl = `/${newLocale}`;

    if (currentPathname === "/products" || currentPathname === "/urunler") {
      newUrl += newLocale === "tr" ? "/urunler" : "/products";
    } else if (currentPathname === "/cart" || currentPathname === "/sepet") {
      newUrl += newLocale === "tr" ? "/sepet" : "/cart";
    } else if (currentPathname === "/categories" || currentPathname === "/kategoriler") {
      newUrl += newLocale === "tr" ? "/kategoriler" : "/categories";
    } else if (currentPathname.startsWith("/products/") || currentPathname.startsWith("/urunler/")) {
      // Handle product detail pages
      const productId = params.id;
      if (productId) {
        newUrl += newLocale === "tr" ? `/urunler/${productId}` : `/products/${productId}`;
      } else {
        newUrl += newLocale === "tr" ? "/urunler" : "/products";
      }
    } else {
      // Default case for home and other pages
      newUrl += currentPathname;
    }

    router.push(newUrl);
  };

  return (
    <div className="flex items-center space-x-1">
      {routing.locales.map((lng) => (
        <button
          key={lng}
          onClick={() => handleLanguageChange(lng)}
          className={`px-2 py-1 text-sm font-medium rounded transition-colors ${
            locale === lng
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary"
          }`}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
