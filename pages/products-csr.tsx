import React, { useState, useCallback } from 'react';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Footer } from '../components/Footer';
import { ProductListItem } from '../components/ProductListItem';
import { useQuery } from 'react-query';
import { PaginationCSR } from '../components/PaginationCSR';

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

const ProductsCSRPage = () => {
  const [pagination, setPagination] = useState<{ take: number; offset: number; actualPage: number }>({
    take: 25,
    offset: 0,
    actualPage: 0,
  });

  const { data, isLoading, error } = useQuery(['products', pagination], () =>
    getProducts(pagination.take, pagination.offset)
  );

  if (error) return <div>Coś poszło nie tak</div>;

  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-1 ">
            {data?.map((product) => (
              <li key={product.id} className="shadow-xl border-2 p-5">
                <ProductListItem
                  data={{
                    thumbnailAlt: product.title,
                    thumbnailUrl: product.image,
                    title: product.title,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </Main>
      <PaginationCSR setPagination={setPagination} actualPage={pagination.actualPage} />
      <Footer />
    </div>
  );
};

export default ProductsCSRPage;
