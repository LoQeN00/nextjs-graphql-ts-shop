import Link from 'next/link';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCartContext } from './useCartContext';
import Stripe from 'stripe';

type Props = {};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartSummary = (props: Props) => {
  const { items, clearCart, total } = useCartContext();

  const pay = async () => {
    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Something went wrong');
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ cartId: 'cl6w1lq0gkdxn0blmu6ymwfdp' }),
    });

    const response = await res.json();

    await stripe.redirectToCheckout({ sessionId: response.session.id });
  };

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
          // <Link href="/checkout">
          //   <a className="px-4 py-3 rounded-full bg-blue-700 text-white text-md lg:text-lg inline-block max-w-[200px] text-center">
          //     Go to checkout
          //   </a>
          // </Link>
          <button
            className="px-4 py-3 rounded-full bg-blue-700 text-white text-md lg:text-lg max-w-[200px] text-center"
            onClick={pay}
          >
            Go to checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartSummary;
