'use client';

import { useBasketContext } from '../context/basketContext';

const AddButton = ({ product }) => {
  const { addToBasket } = useBasketContext();

  return <button onClick={() => addToBasket(product)}>ADD TO BASKET</button>;
};

export default AddButton;
