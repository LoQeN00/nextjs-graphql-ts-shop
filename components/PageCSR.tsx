import React, { Dispatch } from 'react';

type Props = {
  nextPage: number;
  actualPage: number;
  setPagination: Dispatch<{ take: number; offset: number; actualPage: number }>;
  isPreviousData: boolean;
};

export const PageCSR = ({ nextPage, setPagination, actualPage, isPreviousData }: Props) => {
  const changePage = (page: number) => {
    if (page === actualPage) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPagination({ take: 25, offset: 25 * nextPage, actualPage: nextPage });
  };

  return (
    <button
      onClick={() => changePage(nextPage)}
      className={`p-5 ${nextPage === actualPage ? 'bg-red-500' : 'bg-black'}  text-white`}
      disabled={isPreviousData}
    >
      <p>{nextPage + 1}</p>
    </button>
  );
};
