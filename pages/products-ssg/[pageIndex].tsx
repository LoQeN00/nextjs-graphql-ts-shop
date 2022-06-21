import React from 'react';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { Footer } from '../../components/Footer';
import { PaginationSSG } from '../../components/PaginationSSG';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { ProductListItem } from '../../components/ProductListItem';
import Link from 'next/link';
import { QueryClient, dehydrate, useQuery } from 'react-query';

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

const ProductsPage = ({ pageIndex }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data, isLoading, isError, isSuccess } = useQuery('products', () => getProducts(25, pageIndex! * 25), {
    staleTime: Infinity,
  });

  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>
        {isLoading && <div>Loading ...</div>}
        {!data?.length && <div>We couldnt find more items</div>}
        {isSuccess && (
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
        )}
      </Main>
      {data?.length! > 0 && <PaginationSSG pageIndex={pageIndex!} />}

      <Footer />
    </div>
  );
};

export const getStaticProps = async ({ params }: GetStaticPropsContext<{ pageIndex: string }>) => {
  if (!params?.pageIndex) return { props: {}, notFound: true };

  const pageIndex = parseInt(params.pageIndex);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('products', () => getProducts(25, pageIndex * 25));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
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
