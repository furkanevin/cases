'use client';
import Link from 'next/link';
import { SlBasket } from 'react-icons/sl';
import { useBasketContext } from '../context/basketContext';

const BasketButton = () => {
  const { basket } = useBasketContext();
  const total = basket.reduce((total, i) => total + i.amount, 0);

  return (
    <Link href={'/cart'} className="basket">
      <SlBasket />
      <span>{total}</span>
    </Link>
  );
};

export default BasketButton;
