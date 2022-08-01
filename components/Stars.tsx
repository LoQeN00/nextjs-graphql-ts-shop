import React from 'react';

type Props = {
  stars: number;
};

const Stars = ({ stars }: Props) => {
  return (
    <div>
      {Array.from({ length: stars }).map((_, index) => {
        return (
          <span key={index} className="text-yellow-500 text-xl">
            &#9733;
          </span>
        );
      })}
    </div>
  );
};

export default Stars;
