import { useDispatch } from 'react-redux';
import {
  addToCart,
  decreaseCart,
  removeFromCart,
} from '../redux/slices/cartSlice';

const BasketCard = ({ cartItem }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <div className="cart-product">
        <img src={cartItem.image} alt={cartItem.title} />
        <div>
          <h3>{cartItem.title}</h3>
          <p>{cartItem.description}</p>
          <button onClick={() => dispatch(removeFromCart(cartItem))}>
            Remove
          </button>
        </div>
      </div>
      <div className="cart-product-price">${cartItem.price}</div>
      <div className="cart-product-quantity">
        <button onClick={() => dispatch(decreaseCart(cartItem))}>
          -
        </button>
        <div className="count">{cartItem.cartQuantity}</div>
        <button onClick={() => dispatch(addToCart(cartItem))}>
          +
        </button>
      </div>
      <div className="cart-product-total-price">
        ${cartItem.price * cartItem.cartQuantity}
      </div>
    </div>
  );
};

export default BasketCard;
