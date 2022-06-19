import React, { Dispatch } from 'react';
import { useQuery } from 'react-query';

type Props = {
  setPagination: Dispatch<{ take: number; offset: number }>;
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

export const Pagination = ({ setPagination }: Props) => {
  const changePage = (page: number) => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setPagination({ take: 25, offset: 25 * (page - 1) });
  };

  return (
    <div className="flex justify-center items-center p-5 space-x-5">
      <div onClick={() => changePage(1)} className="p-5 bg-red-500 text-white">
        <p>1</p>
      </div>
      <div onClick={() => changePage(2)} className="p-5 bg-red-500 text-white">
        <p>2</p>
      </div>
      <div onClick={() => changePage(3)} className="p-5 bg-red-500 text-white">
        <p>3</p>
      </div>
      <div onClick={() => changePage(4)} className="p-5 bg-red-500 text-white">
        <p>4</p>
      </div>
      <div onClick={() => changePage(5)} className="p-5 bg-red-500 text-white">
        <p>5</p>
      </div>
      <div onClick={() => changePage(6)} className="p-5 bg-red-500 text-white">
        <p>6</p>
      </div>
      <div onClick={() => changePage(7)} className="p-5 bg-red-500 text-white">
        <p>7</p>
      </div>
      <div onClick={() => changePage(8)} className="p-5 bg-red-500 text-white">
        <p>8</p>
      </div>
      <div onClick={() => changePage(9)} className="p-5 bg-red-500 text-white">
        <p>9</p>
      </div>
      <div onClick={() => changePage(10)} className="p-5 bg-red-500 text-white">
        <p>10</p>
      </div>
    </div>
  );
};
