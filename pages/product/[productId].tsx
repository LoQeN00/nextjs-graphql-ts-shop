import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../components/ProductDetails';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import { client } from '../../graphql/apolloClient';
import {
  GetProductsIdsDocument,
  GetProductsIdsQuery,
  GetProductByIdDocument,
  GetProductByIdQuery,
  GetProductByIdQueryVariables,
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  GetProductReviewsQueryVariables,
} from '../../generated/graphql';
import ProductReviews from '../../components/ProductReviews';

type Props = {};

const ProductDetailsPage = ({ data, reviews }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

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
      <ProductReviews reviews={reviews} />
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

  const { data: reviewsData, error: reviewsError } = await client.query<
    GetProductReviewsQuery,
    GetProductReviewsQueryVariables
  >({
    query: GetProductReviewsDocument,
    variables: { id: params.productId },
  });

  if (!productData || !productData.product || productError || reviewsError) {
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
      reviews: reviewsData.reviews,
    },
  };
};
