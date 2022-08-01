import Link from 'next/link';
import React from 'react';
import { useCartContext } from './useCartContext';

type Props = {};

const CartSummary = (props: Props) => {
  const { items, clearCart, total } = useCartContext();

  return (
    <div>
      <div className="font-bold">Element count: {items.length}</div>
      <div className="font-bold">Price: {total}</div>
      <div className="flex flex-col sm:flex-row w-full">
        <button onClick={clearCart} className="px-4 py-2 border-2 border-black rounded-2xl">
          Clear cart
        </button>
        {items.length > 0 && (
          <Link href="/checkout">
            <a className="px-4 py-2 border-2 border-black rounded-2xl ml-5 inline-block">Go to checkout</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
