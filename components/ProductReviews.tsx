import React from 'react';
import { GetProductReviewsQuery, useGetProductReviewsQuery } from '../generated/graphql';
import AddReviewForm from './AddReviewForm';
import Stars from './Stars';
import { useRouter } from 'next/router';

type Props = {};

const ProductReviews = ({}: Props) => {
  const router = useRouter();

  const { data, loading, error } = useGetProductReviewsQuery({ variables: { id: router.query.productId as string } });

  return (
    <div className="my-20 bg-white px-6 py-8 rounded-xl">
      <h1 className="text-4xl text-center font-bold">Opinie</h1>
      <div className="my-5  p-4  rounded-lg space-y-8">
        {loading && (
          <div>
            <p>Loading...</p>
          </div>
        )}
        {data?.reviews.map((review) => {
          return (
            <div
              key={review.id}
              className="space-y-2 flex justify-between items-center bg-gray-200 shadow-xl px-6 py-4 rounded-lg"
            >
              <div>
                <h2 className="font-bold text-xl">{review.name}</h2>
                <p>{review.content}</p>
              </div>
              {review.rating && <Stars stars={review.rating} />}
            </div>
          );
        })}
      </div>
      <AddReviewForm />
    </div>
  );
};

export default ProductReviews;
