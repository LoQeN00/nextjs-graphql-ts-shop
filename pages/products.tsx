import React from 'react';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import { InferGetStaticPropsType } from 'next';
import { Product } from '../components/Product';

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductsPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1 ">
          {data.map((product) => (
            <li key={product.id} className="shadow-xl border-2 p-5">
              <Product
                data={{
                  description: product.description,
                  rating: product.rating.rate,
                  thumbnailAlt: product.title,
                  thumbnailUrl: product.image,
                  title: product.title,
                }}
              />
            </li>
          ))}
        </ul>
      </Main>
      <Footer />
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`https://fakestoreapi.com/products/`);
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default ProductsPage;
