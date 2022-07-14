import React from 'react';
import { PageSSG } from './PageSSG';

type Props = {
  pageIndex: number;
  pages: number;
};

export const PaginationSSG = ({ pageIndex, pages }: Props) => {
  
  const start = pageIndex - 4
  const end = pageIndex + 4

  const pagesArray = []

  for (let i = start; i <= end; i++) {
    pagesArray.push(i)
  }

  const filteredPages = pagesArray.filter(page => page >= 0 && page <= pages)

  return (
    <div className="flex justify-center items-center p-5 space-x-5 max-w-full flex-wrap">
      {filteredPages.map((page, index) => {
        return <PageSSG actualPage={pageIndex} key={index} nextPage={page} />
      })}
    </div>
  );
};