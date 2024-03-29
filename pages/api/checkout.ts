import {
  GetCartByIdDocument,
  GetCartByIdQueryVariables,
  GetCartByIdQuery,
  CreateOrderDocument,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  UpdateOrderDocument,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
  PublishOrderDocument,
  PublishOrderMutation,
  PublishOrderMutationVariables,
  PublishMultipleOrderItemsDocument,
  PublishMultipleOrderItemsMutation,
  PublishMultipleOrderItemsMutationVariables,
  AddOrderToAccountDocument,
  AddOrderToAccountMutation,
  AddOrderToAccountMutationVariables,
  PublishAccountDocument,
  PublishAccountMutation,
  PublishAccountMutationVariables,
  FindAllAccountOrdersDocument,
  ClearCartDocument,
  ClearCartMutationVariables,
  ClearCartMutation,
  PublishCartDocument,
  PublishCartMutation,
  PublishCartMutationVariables,
} from './../../generated/graphql';
import type { NextApiHandler } from 'next';
import { Stripe } from 'stripe';
import { authorizedClient } from '../../graphql/apolloClient';

const handler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    res.status(500).json({ message: 'Missing STRIPE_SECRET_KEY' });
    return;
  }

  const body = req.body as { cartId: string; userId: string; email: string };

  const { data, error, loading } = await authorizedClient.query<GetCartByIdQuery, GetCartByIdQueryVariables>({
    query: GetCartByIdDocument,
    variables: {
      id: body.cartId,
    },
    fetchPolicy: 'network-only',
  });

  if (!data.cart) return res.status(500).json({ message: 'Cart not found' });

  if (!data.cart.cartItems.length) return res.status(500).json({ message: 'No items found' });

  const formattedCartItems = data.cart?.cartItems.map((item) => {
    return {
      price_data: {
        currency: 'PLN',
        unit_amount: Math.round(item.product?.price! * 100)!,
        product_data: {
          name: item.product?.name!,
          images: [item.product!.images[0].url],
        },
      },
      quantity: item.quantity!,
    };
  });

  const stripe = new Stripe(stripeKey, { apiVersion: '2022-08-01' });

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    mode: 'payment',
    locale: 'pl',
    payment_method_types: ['card', 'p24'],
    success_url: `${
      process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL! : process.env.DEVELOPMENT_URL
    }/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${
      process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL! : process.env.DEVELOPMENT_URL
    }/checkout/cancel`,
    line_items: formattedCartItems,
  });

  const total = data.cart.cartItems.reduce((actualPrice, item) => {
    return actualPrice + item.product?.price! * item.quantity;
  }, 0);

  const order = await authorizedClient.mutate<CreateOrderMutation, CreateOrderMutationVariables>({
    mutation: CreateOrderDocument,
    variables: {
      email: body.email,
      stripeCheckoutId: stripeCheckoutSession.id,
      total,
      state: 'PENDING',
    },
  });

  const formattedOrderedItems = data.cart.cartItems.map((item) => {
    return {
      quantity: item.quantity,
      total: item.quantity * item.product?.price!,
      order: { connect: { id: order.data?.order?.id } },
      product: { connect: { id: item.product?.id } },
    };
  });

  const updatedOrder = await authorizedClient.mutate<UpdateOrderMutation, UpdateOrderMutationVariables>({
    mutation: UpdateOrderDocument,
    variables: {
      orderId: order.data?.order?.id!,
      items: {
        create: formattedOrderedItems,
      },
    },
  });

  await authorizedClient.mutate<PublishMultipleOrderItemsMutation, PublishMultipleOrderItemsMutationVariables>({
    mutation: PublishMultipleOrderItemsDocument,
    variables: {
      id: order.data?.order?.id!,
    },
  });

  await authorizedClient.mutate<PublishOrderMutation, PublishOrderMutationVariables>({
    mutation: PublishOrderDocument,
    variables: {
      id: order.data?.order?.id!,
    },
  });

  await authorizedClient.mutate<AddOrderToAccountMutation, AddOrderToAccountMutationVariables>({
    mutation: AddOrderToAccountDocument,
    variables: {
      accountId: body.userId,
      orderId: order.data?.order?.id!,
    },
  });

  await authorizedClient.mutate<PublishAccountMutation, PublishAccountMutationVariables>({
    mutation: PublishAccountDocument,
    variables: {
      id: body.userId,
    },
    refetchQueries: [
      {
        query: FindAllAccountOrdersDocument,
        variables: {
          id: body.userId,
        },
      },
    ],
  });

  await authorizedClient.mutate<ClearCartMutation, ClearCartMutationVariables>({
    mutation: ClearCartDocument,
    variables: {
      id: body.cartId,
    },
  });

  await authorizedClient.mutate<PublishCartMutation, PublishCartMutationVariables>({
    mutation: PublishCartDocument,
    variables: {
      id: body.cartId,
    },
    refetchQueries: [
      {
        query: GetCartByIdDocument,
        variables: {
          id: body.cartId,
        },
      },
    ],
  });

  res.status(201).json({ session: stripeCheckoutSession });

  //@todo stworz order w graphcms
};

export default handler;
