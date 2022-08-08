import React from 'react';
import CartContent from '../components/Cart/CartContent';
import CartSummary from '../components/Cart/CartSummary';
import { useCartContext } from '../components/Cart/useCartContext';

type Props = {};

const CartPage = (props: Props) => {
  return (
    <div>
      <div className="grid sm:grid-cols-3 gap-8 grid-cols-1">
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
