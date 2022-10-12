import React, { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCartContext } from './useCartContext';
import { ClipLoader } from 'react-spinners';
import { useSession } from 'next-auth/react';
import { useFindUserCartIdQuery } from '../../generated/graphql';

type Props = {};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const CartSummary = (props: Props) => {
  const { items, clearCart, total } = useCartContext();

  const [loading, setIsLoading] = useState<boolean>(false);

  const { data: session } = useSession();

  const cartId = useFindUserCartIdQuery({
    variables: {
      id: session?.user.id!,
    },
  });

  const pay = useCallback(async () => {
    setIsLoading(true);

    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error('Something went wrong');
    }

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({
        cartId: cartId.data?.account?.cart?.id,
        userId: session?.user.id,
        email: session?.user.email,
      }),
    });

    const response = await res.json();

    if (!response.session.id) throw new Error('Something went wrong');

    await stripe.redirectToCheckout({ sessionId: response.session.id });

    setIsLoading(false);
  }, [cartId.data?.account?.cart?.id, session?.user.email, session?.user.id]);

  return (
    <div className="flex justify-center items-cente flex-col">
      <div className="font-bold">Element count: {items.length}</div>
      <div className="font-bold">Price: {total}</div>
      <div className="flex flex-col lg:flex-row w-full mt-5 space-y-4 lg:space-y-0 lg:space-x-4">
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="px-4 py-3 rounded-full bg-blue-700 text-white max-w-[200px] text-center text-md lg:text-lg"
          >
            Clear cart
          </button>
        )}
        {items.length > 0 &&
          (loading ? (
            <button className="px-4 py-3 rounded-full bg-blue-700 text-white text-md lg:text-lg max-w-[200px] text-center flex justify-between items-center space-x-4">
              Loading <ClipLoader color="#ffffff" />
            </button>
          ) : (
            <button
              className="px-4 py-3 rounded-full bg-blue-700 text-white text-md lg:text-lg max-w-[200px] text-center"
              onClick={pay}
            >
              Go to Checkout
            </button>
          ))}
      </div>
    </div>
  );
};

export default CartSummary;
