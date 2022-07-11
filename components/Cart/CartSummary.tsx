import React from 'react';
import { useCartContext } from './useCartContext';

type Props = {};

const CartSummary = (props: Props) => {
  const { items } = useCartContext();

  const fullPrice = items.reduce((actualPrice, item) => {
    return actualPrice + item.price;
  }, 0);

  return (
    <div>
      <div className="font-bold">Element count: {items.length}</div>
      <div className="font-bold">Price: {fullPrice}</div>
    </div>
  );
};

export default CartSummary;
