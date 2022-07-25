import React from 'react';
import { useCartContext } from './Cart/useCartContext';
import CheckoutSummaryItem from './CheckoutSummaryItem';

type Props = {};

const CheckoutSummary = (props: Props) => {
  const { items } = useCartContext();
  const fullPrice = items.reduce((actualPrice, item) => {
    return actualPrice + item.price * item.count;
  }, 0);
  return (
    <div>
      <h2 className="text-xl ">Order summary</h2>
      <div className="space-y-12 my-8 divide-y-2 divide-gray-400">
        {items.map((item) => (
          <CheckoutSummaryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CheckoutSummary;
