'use client';
import { IoTrash } from 'react-icons/io5';
import { useBasketContext } from '../context/basketContext';
import Image from 'next/image';
import { FiPlus, FiMinus } from 'react-icons/fi';

const ItemCard = ({ product }) => {
  const { addToBasket, removeFromBasket, decreaseAmount } = useBasketContext();

  let price = product.price * product.amount;

  price = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return (
    <div className="item-card">
      <div className="left">
        <Image src={product.image} width={80} height={80} alt={product.title} />
      </div>

      <div className="mid">
        <h4 className="title">
          {product.title.length > 20
            ? product.title.slice(0, 20) + '...'
            : product.title}
        </h4>
      </div>

      <div className="right">
        <div className="amount">
          <button onClick={() => decreaseAmount(product.id)}>
            <FiMinus />
          </button>
          <span>{product.amount}</span>
          <button onClick={() => addToBasket(product)}>
            <FiPlus />
          </button>
        </div>

        <h4>{price}</h4>

        <button
          className="trash-btn"
          onClick={() => removeFromBasket(product.id)}
        >
          <IoTrash />
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
