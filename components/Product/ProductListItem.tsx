import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { useCartContext } from '../Cart/useCartContext';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

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
  const [disabled, setDisabled] = useState(false);

  const { data: session } = useSession();

  const handleAddItemToCart = useCallback(
    async ({
      title,
      price,
      id,
      image,
      count,
    }: {
      title: string;
      price: number;
      id: string;
      count: number;
      image: string;
    }) => {
      setDisabled(true);
      await addItemToCart({ title, price, id, image, count });
      setDisabled(false);
    },
    [addItemToCart]
  );

  return (
    <div className="flex flex-col justify-center items-center pb-4 group">
      <Link passHref href={`/product/${data.id}`}>
        <div className="bg-white p-4 cursor-pointer w-full">
          <Image
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
            layout="responsive"
            width={4}
            height={3}
            objectFit="contain"
            className="group-hover:scale-110 transition-all ease-in-out"
          />
        </div>
      </Link>

      <h2 className="font-bold text-2xl p-5">{data.title}</h2>
      {session ? (
        <button
          className="px-4 py-2 border-2 border-black rounded-2xl"
          disabled={disabled}
          onClick={() =>
            handleAddItemToCart({
              title: data.title,
              price: data.price,
              count: 1,
              id: data.id,
              image: data.thumbnailUrl,
            })
          }
        >
          Dodaj do koszyka
        </button>
      ) : (
        <p className="text-center">Musisz być zalogowany aby dodać przedmiot do koszyka</p>
      )}
    </div>
  );
};
