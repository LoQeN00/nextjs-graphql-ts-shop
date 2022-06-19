import React from 'react';
import { Rating } from './Rating';

interface ProductDetails {
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  description: string;
}

type ProductListItem = Pick<ProductDetails, 'title' | 'thumbnailUrl' | 'thumbnailAlt'>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <div>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <h2 className="font-bold text-2xl p-4">{data.title}</h2>
    </div>
  );
};
