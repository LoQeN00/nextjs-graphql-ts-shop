import Link from 'next/link';
import React from 'react';
import { useCartContext } from './useCartContext';

type Props = {};

const CartSummary = (props: Props) => {
  const { items, clearCart } = useCartContext();

  const fullPrice = items.reduce((actualPrice, item) => {
    return actualPrice + item.price * item.count;
  }, 0);

  return (
    <div>
      <div className="font-bold">Element count: {items.length}</div>
      <div className="font-bold">Price: {fullPrice}</div>
      <button onClick={clearCart} className="px-4 py-2 border-2 border-black rounded-2xl">
        Clear cart
      </button>
      <Link href="/checkout">
        <a className="px-4 py-2 border-2 border-black rounded-2xl ml-5 inline-block">Go to checkout</a>
      </Link>
    </div>
  );
};

export default CartSummary;
