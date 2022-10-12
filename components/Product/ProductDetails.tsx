import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextReactMarkdown } from '../utils/NextReactMarkdown';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useCartContext } from '../Cart/useCartContext';
import { useSession } from 'next-auth/react';

interface ProductDetailsType {
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  description: MDXRemoteSerializeResult<Record<string, unknown>>;
  price: number;
  id: string;
}

type ProductDetailsProps = {
  data: ProductDetailsType;
};

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  const { addItemToCart } = useCartContext();

  const { data: session } = useSession();

  const [disabled, setDisabled] = useState(false);

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
    <div className="flex items-center justify-center flex-col space-y-8">
      <Link href="/products-graphql">
        <a className="text-xl">Wróc na stronę główną</a>
      </Link>
      <div className="bg-white p-4 max-w-3xl w-full">
        {data.thumbnailUrl && (
          <Image
            src={data.thumbnailUrl}
            alt={data.thumbnailAlt}
            layout="responsive"
            width={16}
            height={9}
            objectFit="contain"
          />
        )}
      </div>
      <div className="p-4 space-y-5 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold">{data.title}</h1>
        <article className="prose lg:prose-xl p-4">
          <NextReactMarkdown description={data.description} />
        </article>
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
    </div>
  );
};
