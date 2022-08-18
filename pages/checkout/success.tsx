import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { useFindOrderByStripeCheckoutIdQuery } from '../../generated/graphql';

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
      <h1>SuccessPage</h1>
    </div>
  );
};

export default SuccessPage;
