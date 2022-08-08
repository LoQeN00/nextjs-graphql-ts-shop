import React from 'react';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../components/Product/ProductDetails';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import { client } from '../../graphql/apolloClient';
import {
  GetProductsIdsDocument,
  GetProductsIdsQuery,
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
} from '../../generated/graphql';
import ProductReviews from '../../components/Review/ProductReviews';

const ProductDetailsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) return <div>Nie znaleziono produktu</div>;

  return (
    <div>
      <NextSeo
        title={data.name}
        description={data.description}
        canonical={`https://nextjs-graphql-ts-shop.vercel.app/product/${data.id}`}
        openGraph={{
          url: `https://nextjs-graphql-ts-shop.vercel.app/product/${data.id}`,
          title: data.name,
          description: data.description,
          images: [
            {
              url: data.images[0].url,
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
          thumbnailAlt: data.name,
          thumbnailUrl: data.images[0]?.url,
          title: data.name,
          price: data.price,
          id: data.id,
        }}
      />
      <ProductReviews />
    </div>
  );
};

export default ProductDetailsPage;

export const getStaticPaths = async () => {
  const { data } = await client.query<GetProductsIdsQuery>({ query: GetProductsIdsDocument });

  const paths = data?.products.map((item) => {
    return { params: { productId: item.id.toString() } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) return { props: {}, notFound: true };

  const { data: productData, error: productError } = await client.query<
    GetProductByIdQuery,
    GetProductByIdQueryVariables
  >({
    query: GetProductByIdDocument,
    variables: { id: params.productId },
  });

  if (!productData || !productData.product || productError) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...productData.product,
        longDescription: await serialize(productData.product?.description),
      },
    },
  };
};
