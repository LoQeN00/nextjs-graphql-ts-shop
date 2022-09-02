import React from 'react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../utils/Input';
import {
  GetProductReviewsDocument,
  GetProductReviewsQuery,
  useCreateProductReviewMutation,
  usePublishProductReviewMutation,
} from '../../generated/graphql';
import { useRouter } from 'next/router';
import { displayToast } from '../../lib/displayToast';
import { useSession } from 'next-auth/react';

type Props = {};

const schema = yup.object().shape({
  content: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  rating: yup.number().required(),
});

export type AddReviewFormData = yup.InferType<typeof schema>;

const AddReviewForm = (props: Props) => {
  const methods = useForm<AddReviewFormData>({
    resolver: yupResolver(schema),
  });

  const { data: session } = useSession();

  const router = useRouter();

  const [createProductReview] = useCreateProductReviewMutation();
  const [publishProductReview] = usePublishProductReviewMutation({
    // refetchQueries: [
    //   {
    //     query: GetProductReviewsDocument,
    //     variables: { id: router.query.productId as string },
    //   }
    // ],
    update(cache, result) {
      const originalReviewsQuery = cache.readQuery<GetProductReviewsQuery>({
        query: GetProductReviewsDocument,
        variables: { id: router.query.productId as string },
      });

      if (!originalReviewsQuery || !result.data?.review) return;

      const newReviews = [result.data.review, ...originalReviewsQuery.reviews];

      cache.writeQuery({
        query: GetProductReviewsDocument,
        variables: { id: router.query.productId as string },
        data: {
          reviews: newReviews,
        },
      });
    },
  });

  const onSubmit = async (data: AddReviewFormData) => {
    const reviewData = await createProductReview({
      variables: {
        review: {
          content: data.content,
          email: data.email,
          rating: data.rating,
          name: data.name,
          headline: data.content,
          product: {
            connect: {
              id: router.query.productId as string,
            },
          },
        },
      },
    });

    if (!reviewData) return;

    await publishProductReview({
      variables: { reviewId: reviewData.data?.review?.id! },
      optimisticResponse: {
        __typename: 'Mutation',
        review: {
          __typename: 'Review',
          id: reviewData.data?.review?.id!,
          headline: data.content,
          content: data.content,
          name: data.name,
          rating: data.rating,
        },
      },
    });

    methods.reset();
    displayToast('Opinia została dodana i czeka na weryfikację');
  };

  return (
    <div>
      {session ? (
        <FormProvider {...methods}>
          <div>
            <h1 className="mb-4 font-semibold text-2xl">Dodaj własną opinię</h1>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
              <Input className="w-full" id="name" label="Name" type="text" />
              <Input className="w-full" id="email" label="Email" type="text" />
              <Input className="w-full" id="content" label="Content" type="text" />
              <Input className="w-full" id="rating" label="Rating" type="number" />
              <button type="submit" className="px-4 py-2 rounded-full bg-blue-700 text-white">
                Continue
              </button>
            </form>
          </div>
        </FormProvider>
      ) : (
        <p className="text-center">Aby dodać opinie musisz być zalogowany</p>
      )}
    </div>
  );
};

export default AddReviewForm;
