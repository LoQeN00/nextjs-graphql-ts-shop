import {
  UpdateOrderByStripeCheckoutIdDocument,
  UpdateOrderByStripeCheckoutIdMutation,
  UpdateOrderByStripeCheckoutIdMutationVariables,
} from './../../generated/graphql';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import { client } from '../../graphql/apolloClient';

const handler: NextApiHandler = async (req, res) => {
  const event = req.body;

  const changeOrderStatus = async (id: string) => {
    await client.mutate<UpdateOrderByStripeCheckoutIdMutation, UpdateOrderByStripeCheckoutIdMutationVariables>({
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
      changeOrderStatus(event.data.object.id);
      break;
  }

  res.status(204).end();
};

export default handler;
