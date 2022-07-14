import React from 'react';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { Footer } from '../../components/Footer';
import { PaginationSSG } from '../../components/PaginationSSG';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../../components/ProductListItem';
import Link from 'next/link';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import { checkProducts } from '../../lib/checkProducts';

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

const getProducts = async (take: number, offset: number) => {
  const res = await fetch(`https://naszsklep-api.vercel.app/api/products?take=${take}&offset=${offset}`);
  const data: StoreApiResponse[] = await res.json();
  return data;
};

const ProductsPage = ({ pageIndex, pages  }: InferGetStaticPropsType<typeof getStaticProps>) => {

  console.log(pages)

  const { data, isLoading, isSuccess, isPreviousData } = useQuery(['products', pageIndex], () =>
    getProducts(25, pageIndex! * 25)
  );

  
  return (
    <>
      {isLoading && <div>Loading ...</div>}
      {data?.length === 0 && <div>No data</div>}
      {isSuccess && (
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1 ">
          {data?.map((product) => (
            <li className="shadow-2xl border-2" key={product.id}>
              <ProductListItem
                data={{
                  id: product.id,
                  thumbnailAlt: product.title,
                  thumbnailUrl: product.image,
                  title: product.title,
                  price: product.price,
                }}
              />
            </li>
          ))}
        </ul>
      )}

      <PaginationSSG pageIndex={pageIndex!} pages={pages!} />
    </>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ pageIndex: string }>) => {
  if (!params?.pageIndex) return { props: {}, notFound: true };

  const pageIndex = parseInt(params.pageIndex);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('products', () => getProducts(25, pageIndex * 25));

  const pages = await checkProducts()

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageIndex,
      pages: Math.floor(pages/25)
    },
  };
};

export const getStaticPaths = async () => {
  const paths = [];

  const pages = await checkProducts();

  for (let i = 0; i < Math.floor(pages/25); i++) {
    paths.push({ params: { pageIndex: i.toString() } });
  }

  return {
    paths,
    fallback: 'blocking',
  };
};

export default ProductsPage;
