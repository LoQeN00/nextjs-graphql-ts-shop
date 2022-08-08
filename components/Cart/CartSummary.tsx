import Link from 'next/link';
import React from 'react';
import { useCartContext } from './useCartContext';

type Props = {};

const CartSummary = (props: Props) => {
  const { items, clearCart, total } = useCartContext();

  return (
    <div className="flex justify-center items-cente flex-col">
      <div className="font-bold">Element count: {items.length}</div>
      <div className="font-bold">Price: {total}</div>
      <div className="flex flex-col lg:flex-row w-full mt-5 space-y-4 lg:space-y-0 lg:space-x-4">
        <button
          onClick={clearCart}
          className="px-4 py-3 rounded-full bg-blue-700 text-white max-w-[200px] text-center text-md lg:text-lg"
        >
          Clear cart
        </button>
        {items.length > 0 && (
          <Link href="/checkout">
            <a className="px-4 py-3 rounded-full bg-blue-700 text-white text-md lg:text-lg inline-block max-w-[200px] text-center">
              Go to checkout
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
