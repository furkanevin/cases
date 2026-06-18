import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "tr"],

  // Used when no locale matches
  defaultLocale: "en",

  // The `pathnames` object maps pathnames to localized versions
  pathnames: {
    "/": "/",
    "/products": {
      en: "/products",
      tr: "/urunler",
    },
    "/products/[id]": {
      en: "/products/[id]",
      tr: "/urunler/[id]",
    },
    "/products?category=[category]": {
      en: "/products?category=[category]",
      tr: "/urunler?category=[category]",
    },
    "/cart": {
      en: "/cart",
      tr: "/sepet",
    },
    "/categories": {
      en: "/categories",
      tr: "/kategoriler",
    },
  },
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
