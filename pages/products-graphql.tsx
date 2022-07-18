import React from 'react';

import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../components/ProductListItem';
import {client} from "../graphql/apolloClient"
import { gql } from '@apollo/client';



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



const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {



 

  
  return (
    <>
      {data?.products.length === 0 && <div>No data</div>}
      {data?.products.length > 0 && (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1 ">
          {data?.products.map((product : any) => (
            <li className="shadow-2xl border-2" key={product.id}>
              <ProductListItem
                data={{
                  id: product.id,
                  thumbnailAlt: product.name,
                  thumbnailUrl: product.images[0].url,
                  title: product.name,
                  price: product.price,
                  slug: product.slug
                }}
              />
            </li>
          ))}
        </ul>
      )}

    </>
  );
};

export const getStaticProps = async () => {

    const GET_PRODUCTS = gql`
        query GetProductsList {
            products {
                id
                name
                price
                description
                slug
                images {
                    url
                }
            }
        }
    `

    const {data} = await client.query({query: GET_PRODUCTS})

    return {
        props: {
            data
        },
    };
};


export default ProductsPage;
