import React from 'react';
import { CartItem } from './Cart/CartContext';
import Image from 'next/image';

type Props = {
  item: CartItem;
};

const CheckoutSummaryItem = ({ item }: Props) => {
  return (
    <div className="flex justify-between p-4">
      <div className="w-[40%]">
        <div>
          <Image src={item.image} layout="responsive" width={4} height={3} objectFit="contain" alt={item.title} />
        </div>
      </div>
      <div className="flex items-end flex-col space-y-2">
        <h3 className="font-semibold">
          {item.count} x {item.title}
        </h3>
        <h3 className="font-semibold">${item.price.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default CheckoutSummaryItem;
