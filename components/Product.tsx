import React from 'react';
import { Rating } from './Rating';

interface ProcuctProps {
  data: {
    description: string;
    title: string;
    thumbnailUrl: string;
    thumbnailAlt: string;
    rating: number;
  };
}

export const Product = ({ data }: ProcuctProps) => {
  return (
    <div>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <h2 className="font-bold text-2xl p-4">{data.title}</h2>
      <p className="p-4">{data.description}</p>
      <Rating rating={data.rating} />
    </div>
  );
};
