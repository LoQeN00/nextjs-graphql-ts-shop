import React from 'react';
import Link from 'next/link';

type Props = {
  nextPage: number;
  actualPage: number;
};

export const PageSSG = ({ nextPage, actualPage }: Props) => {
  return (
    <Link href={`/products-ssg/${nextPage}`} passHref>
      <div className={`${actualPage === nextPage ? 'bg-red-500 ' : 'bg-black'} p-5 text-white m-1`}>
        <p>{nextPage + 1}</p>
      </div>
    </Link>
  );
};
