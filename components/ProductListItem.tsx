import React from 'react';
import { Rating } from './Rating';
import Image from 'next/image';

interface ProductDetailsType {
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: {
    count: number;
    rate: number;
  };
  description: string;
}

type ProductListItem = Pick<ProductDetailsType, 'title' | 'thumbnailUrl' | 'thumbnailAlt'>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <>
      <div className="bg-white p-4 cursor-pointer">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={4}
          height={3}
          objectFit="contain"
        />
      </div>

      <h2 className="font-bold text-2xl p-5">{data.title}</h2>
    </>
  );
};
