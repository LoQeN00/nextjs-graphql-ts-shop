import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../components/ProductDetails';
import { serialize } from 'next-mdx-remote/serialize';

import { NextSeo } from 'next-seo';

type Props = {};

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  longDescription: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductDetailsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!data) return <div>Nie znaleziono produktu</div>;

  return (
    <div>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://nextjs-graphql-ts-shop.vercel.app/product/${data.id}`}
        openGraph={{
          url: `https://nextjs-graphql-ts-shop.vercel.app/product/${data.id}`,
          title: data.title,
          description: data.description,
          images: [
            {
              url: data.image,
              width: 800,
              height: 600,
              alt: data.description,
              type: 'image/jpeg',
            },
          ],
          site_name: 'Sklep Odzieżowy',
        }}
      />
      <ProductDetails
        data={{
          description: data.longDescription,
          thumbnailAlt: data.title,
          thumbnailUrl: data.image,
          title: data.title,
          rating: data.rating,
        }}
      />
    </div>
  );
};

export default ProductDetailsPage;

export const getStaticPaths = async () => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products`);
  const data: StoreApiResponse[] = await res.json();

  const paths = data.map((item) => {
    return { params: { productId: item.id.toString() } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) return { props: {}, notFound: true };

  const res = await fetch(`https://naszsklep-api.vercel.app/api/products/${params.productId}`);
  const data: StoreApiResponse | null = await res.json();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  const compiledMarkdown = await serialize(data.longDescription);

  return {
    props: {
      data: {
        ...data,
        longDescription: compiledMarkdown,
      },
    },
  };
};
