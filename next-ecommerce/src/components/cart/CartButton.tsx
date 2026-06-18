"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Button from "@/components/ui/Button";
import { useAppSelector } from "@/store/hooks";
import { selectCartItemsCount } from "@/store/slices/cartSlice";

export default function CartButton() {
  const locale = useLocale();
  const itemsCount = useAppSelector(selectCartItemsCount);

  // Create localized cart URL
  const cartUrl = locale === "tr" ? "/tr/sepet" : "/en/cart";

  return (
    <Link href={cartUrl}>
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCartIcon className="h-5 w-5" />
        {itemsCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-medium flex items-center justify-center">
            {itemsCount > 99 ? "99+" : itemsCount}
          </span>
        )}
        <span className="sr-only">Shopping cart ({itemsCount} items)</span>
      </Button>
    </Link>
  );
}
