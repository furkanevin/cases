import Link from 'next/link';
import { GoArrowLeft } from 'react-icons/go';
import BasketItems from './CartItems';
import Total from './Total';

const CartPage = () => {
  return (
    <div className="cart-page">
      <div className="container">
        <h2>Shopping Cart</h2>

        <BasketItems />

        <section className="bottom">
          <Link href={'/'}>
            <GoArrowLeft />
            <span>Continue Shopping</span>
          </Link>

          <div>
            <input placeholder="Promo Code" type="text" />

            <Total />

            <button>CHECKOUT</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CartPage;
