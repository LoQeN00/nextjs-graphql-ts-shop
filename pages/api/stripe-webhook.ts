import {
  UpdateOrderByStripeCheckoutIdDocument,
  UpdateOrderByStripeCheckoutIdMutation,
  UpdateOrderByStripeCheckoutIdMutationVariables,
  PublishOrderDocument,
  PublishOrderMutation,
  PublishOrderMutationVariables,
  FindAllAccountOrdersDocument,
} from './../../generated/graphql';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler, PageConfig } from 'next';
import { authorizedClient } from '../../graphql/apolloClient';
import { Readable } from 'stream';
import { Stripe } from 'stripe';

async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const handler: NextApiHandler = async (req, res) => {
  const body = await buffer(req);
  const signature = req.headers['stripe-signature'];
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    res.status(500).json({ message: 'MISSING STRIPE KEY' });
    return;
  }

  if (typeof signature !== 'string') {
    res.status(500).json({ message: 'SIGNATURE IS NOT A STRING' });
    return;
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    res.status(500).json({ message: 'MISSING STRIPE WEBHOOK SECRET' });
    return;
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2022-08-01' });

  const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);

  console.log(event);

  // const event = req.body;

  const changeOrderStatus = async (id: string) => {
    const order = await authorizedClient.mutate<
      UpdateOrderByStripeCheckoutIdMutation,
      UpdateOrderByStripeCheckoutIdMutationVariables
    >({
      mutation: UpdateOrderByStripeCheckoutIdDocument,
      variables: {
        stripeCheckoutId: id,
        state: 'PAID',
      },
    });
  };

  switch (event.type) {
    case 'charge.succeeded':
      //   console.log(event);

      break;

    case 'checkout.session.completed':
      //@ts-ignore
      changeOrderStatus(event.data.object.id);
      break;
  }

  res.status(204).end();
};

export default handler;

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};
