import React from 'react';
import { Rating } from './Rating';
import Image from 'next/image';
import { useCartContext } from './Cart/useCartContext';
import Link from 'next/link';

interface ProductDetailsType {
  id: string;
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: {
    count: number;
    rate: number;
  };
  description: string;
  price: number;
  slug: string;
}

type ProductListItem = Pick<ProductDetailsType, 'title' | 'thumbnailUrl' | 'thumbnailAlt' | 'price' | 'id' | 'slug'>;

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductListItem = ({ data }: ProductListItemProps) => {
  const { addItemToCart } = useCartContext();

  return (
    <div className="flex flex-col justify-center items-center pb-4">
      <Link passHref href={`/product/${data.id}`}>
        <div className="bg-white p-4 cursor-pointer w-full">
          <Image
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
            layout="responsive"
            width={4}
            height={3}
            objectFit="contain"
          />
        </div>
      </Link>

      <h2 className="font-bold text-2xl p-5">{data.title}</h2>
      <button
        className="px-4 py-2 border-2 border-black rounded-2xl"
        onClick={() => addItemToCart({ title: data.title, price: data.price, count: 1, id: data.id })}
      >
        Dodaj do koszyka
      </button>
    </div>
  );
};
