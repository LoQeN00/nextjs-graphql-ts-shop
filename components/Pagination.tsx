import React, { Dispatch } from 'react';
import { useQuery } from 'react-query';
import { Page } from './Page';

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

export const Pagination = ({ setPagination, actualPage }: Props) => {
  return (
    <div className="flex justify-center items-center p-5 space-x-5">
      <Page setPagination={setPagination} nextPage={0} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={1} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={2} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={3} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={4} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={5} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={6} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={7} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={8} actualPage={actualPage} />
      <Page setPagination={setPagination} nextPage={9} actualPage={actualPage} />
    </div>
  );
};
