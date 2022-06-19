import React, { Dispatch } from 'react';

type Props = {
  nextPage: number;
  actualPage: number;
  setPagination: Dispatch<{ take: number; offset: number; actualPage: number }>;
};

export const Page = ({ nextPage, setPagination, actualPage }: Props) => {
  const changePage = (page: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPagination({ take: 25, offset: 25 * nextPage, actualPage: nextPage });
  };

  return (
    <div
      onClick={() => changePage(nextPage)}
      className={`p-5 ${nextPage === actualPage ? 'bg-red-500' : 'bg-black'}  text-white`}
    >
      <p>{nextPage + 1}</p>
    </div>
  );
};
