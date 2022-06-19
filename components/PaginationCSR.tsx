import React, { Dispatch } from 'react';
import { useQuery } from 'react-query';
import { PageCSR } from './PageCSR';

type Props = {
  setPagination: Dispatch<{ take: number; offset: number; actualPage: number }>;
  actualPage: number;
};

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

export const PaginationCSR = ({ setPagination, actualPage }: Props) => {
  return (
    <div className="flex justify-center items-center p-5 space-x-5">
      <PageCSR setPagination={setPagination} nextPage={0} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={1} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={2} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={3} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={4} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={5} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={6} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={7} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={8} actualPage={actualPage} />
      <PageCSR setPagination={setPagination} nextPage={9} actualPage={actualPage} />
    </div>
  );
};
