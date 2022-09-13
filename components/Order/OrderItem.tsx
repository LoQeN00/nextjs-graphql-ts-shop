import React from 'react';
import Image from 'next/image';
import { OrderItem as OrderItemType } from '../../generated/graphql';

interface Props {
  item: {
    __typename?: 'OrderItem' | undefined;
    id: string;
    quantity: number;
    product?:
      | {
          __typename?: 'Product' | undefined;
          name: string;
          id: string;
          price: number;
          images: {
            __typename?: 'Asset' | undefined;
            url: string;
          }[];
        }
      | null
      | undefined;
  };
}

export const OrderItem = ({ item }: Props) => {
  return (
    <div className="mb-4 bg-white grid grid-cols-4 p-4 rounded-xl shadow-xl">
      <div className="relative">
        <Image
          src={item.product?.images[0].url!}
          layout="responsive"
          width={4}
          height={3}
          objectFit="contain"
          alt={item.product?.name}
        />
      </div>
      <div className="flex items-center">
        <p>{item.product?.name}</p>
      </div>
      <div className="flex items-center">
        <p>x{item.quantity}</p>
      </div>
      <div className="flex items-center">
        <p>{item.product?.price! * item.quantity}</p>
      </div>
    </div>
  );
};
