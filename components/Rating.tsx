import React from 'react';

type Props = {
  rating: number;
};

export const Rating = ({ rating }: Props) => {
  return (
    <div className="text-blue-500 font-bold p-4">
      <p>{rating}</p>
    </div>
  );
};
