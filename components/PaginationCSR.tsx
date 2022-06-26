import React, { Dispatch } from 'react';
import { useQuery } from 'react-query';
import { PageCSR } from './PageCSR';

type Props = {
  setPagination: Dispatch<{ take: number; offset: number; actualPage: number }>;
  actualPage: number;
  isPreviousData: boolean;
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

export const PaginationCSR = ({ setPagination, actualPage, isPreviousData }: Props) => {
  return (
    <div className="flex justify-center items-center p-5 space-x-5 flex-wrap">
      <PageCSR setPagination={setPagination} nextPage={0} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={1} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={2} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={3} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={4} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={5} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={6} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={7} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={8} actualPage={actualPage} isPreviousData={isPreviousData} />
      <PageCSR setPagination={setPagination} nextPage={9} actualPage={actualPage} isPreviousData={isPreviousData} />
    </div>
  );
};