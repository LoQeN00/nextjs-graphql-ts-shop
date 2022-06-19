import React from 'react';

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

type ProductDetailsProps = {
  data: ProductDetailsType;
};

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <div>
      <h1>{data.title}</h1>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <p>{data.description}</p>
    </div>
  );
};
