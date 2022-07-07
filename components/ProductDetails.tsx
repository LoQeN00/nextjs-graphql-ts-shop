import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { NextReactMarkdown } from '../components/NextReactMarkdown';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';

interface ProductDetailsType {
  title: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: {
    count: number;
    rate: number;
  };
  description: MDXRemoteSerializeResult<Record<string, unknown>>;
}

type ProductDetailsProps = {
  data: ProductDetailsType;
};

export const ProductDetails = ({ data }: ProductDetailsProps) => {
  return (
    <div className="flex items-center justify-center flex-col space-y-8">
      <Link href="/products-ssg/0">
        <a className="text-xl">Wróc na stronę główną</a>
      </Link>
      <div className="bg-white p-4 max-w-3xl w-full">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <div className="p-4 space-y-5">
        <h1 className="text-5xl font-bold">{data.title}</h1>
        <article className="prose lg:prose-xl p-4">
          <NextReactMarkdown description={data.description} />
        </article>
      </div>
    </div>
  );
};
