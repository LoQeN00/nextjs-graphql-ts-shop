import React from 'react';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { Footer } from '../../components/Footer';
import { PaginationSSG } from '../../components/PaginationSSG';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../../components/ProductListItem';
import Link from 'next/link';

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

const ProductsPage = ({ data, pageIndex }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1 ">
          {data?.map((product) => (
            <Link key={product.id} passHref href={`/product/${product.id}`}>
              <li className="shadow-xl border-2 p-5">
                <ProductListItem
                  data={{
                    thumbnailAlt: product.title,
                    thumbnailUrl: product.image,
                    title: product.title,
                  }}
                />
              </li>
            </Link>
          ))}
        </ul>
      </Main>
      <PaginationSSG pageIndex={pageIndex!} />
      <Footer />
    </div>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ pageIndex: string }>) => {
  if (!params?.pageIndex) return { props: {}, notFound: true };

  const pageIndex = parseInt(params.pageIndex);

  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=25&offset=${pageIndex * 25}`);
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
      pageIndex,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [];

  for (let i = 0; i < 10; i++) {
    paths.push({ params: { pageIndex: i.toString() } });
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export default ProductsPage;
