import { GetCartByIdDocument, GetCartByIdQueryVariables, GetCartByIdQuery } from './../../generated/graphql';
import type { NextApiHandler } from 'next';
import { Stripe } from 'stripe';
import { client } from '../../graphql/apolloClient';

const handler: NextApiHandler = async (req, res) => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    res.status(500).json({ message: 'Missing STRIPE_SECRET_KEY' });
    return;
  }

  const body = req.body as { cartId: string };

  console.log(body);

  const { data, error, loading } = await client.query<GetCartByIdQuery, GetCartByIdQueryVariables>({
    query: GetCartByIdDocument,
    variables: {
      id: body.cartId,
    },
    fetchPolicy: 'no-cache',
  });

  console.log(data.cart?.cartItems);

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
    success_url: 'http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/checkout/cancel',
    line_items: formattedCartItems,
  });

  res.status(201).json({ session: stripeCheckoutSession });

  //@todo stworz order w graphcms
};

export default handler;
