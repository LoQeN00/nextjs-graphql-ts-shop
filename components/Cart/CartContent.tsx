import React from 'react';
import { useCartContext } from './useCartContext';

type Props = {};

const CartContent = (props: Props) => {
  const { items, removeItemFromCart } = useCartContext();

  return (
    <div className="col-span-2">
      <ul className="divide-y divide-gray-200">
        <li className="p-4 flex justify-between">
          <div className="font-bold">Product</div>
          <div className="font-bold mr-8">Price</div>
        </li>
        {items.map((item, index) => (
          <li key={index} className="p-4 flex justify-between">
            <div>
              {item.count} x {item.title}
            </div>
            <div className="flex item-center">
              {item.price * item.count}{' '}
              <button className="ml-4" onClick={() => removeItemFromCart(item.id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartContent;
