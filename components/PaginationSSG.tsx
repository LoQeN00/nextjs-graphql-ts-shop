import React from 'react';
import { PageSSG } from './PageSSG';

type Props = {
  pageIndex: number;
};

export const PaginationSSG = ({ pageIndex }: Props) => {
  return (
    <div className="flex justify-center items-center p-5 space-x-5 max-w-full flex-wrap">
      <PageSSG actualPage={pageIndex} nextPage={0} />
      <PageSSG actualPage={pageIndex} nextPage={1} />
      <PageSSG actualPage={pageIndex} nextPage={2} />
      <PageSSG actualPage={pageIndex} nextPage={3} />
      <PageSSG actualPage={pageIndex} nextPage={4} />
      <PageSSG actualPage={pageIndex} nextPage={5} />
      <PageSSG actualPage={pageIndex} nextPage={6} />
      <PageSSG actualPage={pageIndex} nextPage={7} />
      <PageSSG actualPage={pageIndex} nextPage={8} />
      <PageSSG actualPage={pageIndex} nextPage={9} />
    </div>
  );
};
