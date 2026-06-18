"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tCommon = useTranslations("common");
  const tNavigation = useTranslations("navigation");

  // Create localized URLs
  const homeUrl = locale === "tr" ? "/tr" : "/en";
  const productsUrl = locale === "tr" ? "/tr/urunler" : "/en/products";
  const electronicsUrl = locale === "tr" ? "/tr/urunler?category=electronics" : "/en/products?category=electronics";
  const jewelryUrl = locale === "tr" ? "/tr/urunler?category=jewelery" : "/en/products?category=jewelery";
  const mensUrl = locale === "tr" ? "/tr/urunler?category=men's clothing" : "/en/products?category=men's clothing";
  const womensUrl =
    locale === "tr" ? "/tr/urunler?category=women's clothing" : "/en/products?category=women's clothing";

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="space-y-4">
              <Link href={homeUrl} className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary"></div>
                <span className="text-xl font-bold">E-Shop</span>
              </Link>
              <p className="text-sm text-muted-foreground">{t("description")}</p>
            </div>

            {/* Products */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{tNavigation("products")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href={productsUrl} className="text-muted-foreground hover:text-foreground">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link href={electronicsUrl} className="text-muted-foreground hover:text-foreground">
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link href={jewelryUrl} className="text-muted-foreground hover:text-foreground">
                    Jewelry
                  </Link>
                </li>
                <li>
                  <Link href={mensUrl} className="text-muted-foreground hover:text-foreground">
                    Men's Clothing
                  </Link>
                </li>
                <li>
                  <Link href={womensUrl} className="text-muted-foreground hover:text-foreground">
                    Women's Clothing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{t("company")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    {t("aboutUs")}
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                    {t("contact")}
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                    {t("careers")}
                  </Link>
                </li>
                <li>
                  <Link href="/news" className="text-muted-foreground hover:text-foreground">
                    {t("news")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">{t("support")}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/help" className="text-muted-foreground hover:text-foreground">
                    {t("helpCenter")}
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                    {t("shippingInfo")}
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                    {t("returns")}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    {t("privacyPolicy")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} E-Shop. {t("allRightsReserved")}
              </p>
              <div className="flex space-x-6">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("termsOfService")}
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  {t("privacyPolicy")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
