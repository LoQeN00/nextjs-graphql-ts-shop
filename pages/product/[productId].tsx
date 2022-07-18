import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductDetails } from '../../components/ProductDetails';
import { serialize } from 'next-mdx-remote/serialize';
import { NextSeo } from 'next-seo';
import {client} from "../../graphql/apolloClient";
import { gql } from '@apollo/client';

type Props = {};



const ProductDetailsPage = ({data }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          thumbnailAlt: data?.name,
          thumbnailUrl: data?.images[0]?.url,
          title: data?.name,
        }}
      />
    </div>
  )
};

export default ProductDetailsPage;

export const getStaticPaths = async () => {

  const GET_PRODUCTS = gql`
        query GetProductsListIds {
            products {
                id
            }
        }
    `

  const { data } = await client.query({query: GET_PRODUCTS})

  const paths = data?.products.map((item: any) => {
    return { params: { productId: item.id.toString()} };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ productId: string }>) => {
  if (!params?.productId) return { props: {}, notFound: true };

  const GET_PRODUCT = gql`
    query($id: ID!) {
      product(where: {id: $id}) {
        id
        name
        description
        images {
          url
        }
        price
      }
    }
  `
  const {data, error} = await client.query({query: GET_PRODUCT, variables: {id: params.productId}})

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }


  return {
    props: {
      data: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  };

};
