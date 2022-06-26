import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
    <>
      <Link href="/products-ssg/0">
        <a className="text-xl">Wróc na stronę główną</a>
      </Link>
      <div className="bg-white p-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <div className="p-4">
        <h1 className="text-3xl font-bold">{data.title}</h1>
        <p className="text-xl mt-2">{data.description}</p>
      </div>
    </>
  );
};
