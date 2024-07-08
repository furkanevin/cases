'use client';
import { useBasketContext } from '../context/basketContext';

const Total = () => {
  const { basket } = useBasketContext();
  const total = basket.reduce((total, i) => total + i.amount * i.price, 0);

  return (
    <p>
      Total cost: <span>${total.toFixed(3)}</span>
    </p>
  );
};

export default Total;
