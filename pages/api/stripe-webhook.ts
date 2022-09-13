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
import type { NextApiHandler } from 'next';
import { authorizedClient } from '../../graphql/apolloClient';

const handler: NextApiHandler = async (req, res) => {
  const event = req.body;

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

    if (order.data?.updateOrder?.id) {
      const publishOrder = await authorizedClient.mutate<PublishOrderMutation, PublishOrderMutationVariables>({
        mutation: PublishOrderDocument,
        variables: {
          id: order.data?.updateOrder?.id!,
        },
      });
    }
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
