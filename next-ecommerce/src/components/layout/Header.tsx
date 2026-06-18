"use client";

import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import Button from "@/components/ui/Button";
import CartButton from "@/components/cart/CartButton";
import LanguageSwitch from "@/components/ui/LanguageSwitch";

export default function Header() {
  const locale = useLocale();
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");

  // Create localized URLs
  const homeUrl = locale === "tr" ? "/tr" : "/en";
  const productsUrl = locale === "tr" ? "/tr/urunler" : "/en/products";
  const categoriesUrl = locale === "tr" ? "/tr/kategoriler" : "/en/categories";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={homeUrl} className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary"></div>
              <span className="text-xl font-bold">E-Shop</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href={homeUrl} className="text-sm font-medium transition-colors hover:text-primary">
              {t("home")}
            </Link>
            <Link href={productsUrl} className="text-sm font-medium transition-colors hover:text-primary">
              {t("products")}
            </Link>
            <Link href={categoriesUrl} className="text-sm font-medium transition-colors hover:text-primary">
              {t("categories")}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search - for future implementation */}
            <div className="hidden lg:flex">
              <input
                type="search"
                placeholder={tCommon("search")}
                aria-label={tCommon("search")}
                className="w-64 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>

            {/* Language Switch */}
            <LanguageSwitch />

            {/* Cart */}
            <CartButton />

            {/* User account */}
            <Button variant="ghost" size="icon">
              <UserIcon className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>

            {/* Mobile menu button - for future implementation */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
