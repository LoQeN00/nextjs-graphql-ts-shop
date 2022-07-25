import React from 'react';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutSummary from '../components/CheckoutSummary';

type Props = {};

const CheckoutPage = (props: Props) => {
  return (
    <div className="w-full flex space-x-4 flex-col md:flex-row">
      <div className="w-full md:w-[50%] p-8 order-2 md:order-first">
        <CheckoutForm />
      </div>
      <div className="w-full md:w-[50%] p-8">
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;