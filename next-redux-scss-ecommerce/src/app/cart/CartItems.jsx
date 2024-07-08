'use client';
import { useBasketContext } from '../context/basketContext';
import ItemCard from './ItemCard';

const CartItems = () => {
  const { basket } = useBasketContext();

  return (
    <div>
      {basket.length === 0 ? (
        <p>Nothing in the Card</p>
      ) : (
        basket.map((product) => <ItemCard product={product} key={product.id} />)
      )}
    </div>
  );
};

export default CartItems;
