import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { useFindOrderByStripeCheckoutIdQuery } from '../../generated/graphql';
import { OrderItem } from '../../components/Order/OrderItem';

type Props = {};

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const SuccessPage = (props: Props) => {
  const router = useRouter();

  const sessionId = router.query.session_id as string;

  const { data, loading, error } = useFindOrderByStripeCheckoutIdQuery({
    variables: {
      id: sessionId,
    },
    fetchPolicy: 'no-cache',
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Zamówienie zostało złożone</h1>
      <h2 className="font-semibold">Status Zamówienia: {data?.order?.state}</h2>
      <h2 className="font-semibold">Zamówione Przedmioty:</h2>
      {data?.order?.orderItems.map((item) => {
        return <OrderItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default SuccessPage;
