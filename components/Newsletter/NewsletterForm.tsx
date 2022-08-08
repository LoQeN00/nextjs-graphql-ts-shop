import React from 'react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../utils/Input';
import { useMutation } from '@tanstack/react-query';
import { displayToast } from '../../lib/displayToast';

const schema = yup.object().shape({
  email: yup.string().required(),
});

export type NewsletterFormData = yup.InferType<typeof schema>;

type Props = {};

export const NewsletterForm = (props: Props) => {
  const methods = useForm<NewsletterFormData>({
    resolver: yupResolver(schema),
  });

  const useAddToNewsletterMutation = () => {
    return useMutation(async ({ email }: { email: string }) => {
      await fetch('http://localhost:3000/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      methods.reset();
    });
  };

  const { mutate } = useAddToNewsletterMutation();

  const onSubmit = async (data: NewsletterFormData) => {
    mutate({ email: data.email });
  };
  return (
    <FormProvider {...methods}>
      <div>
        <h1 className="mb-4 font-semibold text-2xl">Zapisz się do newslettera</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <Input className="w-full" id="email" label="Email" type="email" />
          <button type="submit" className="px-4 py-2 rounded-full bg-blue-700 text-white">
            Continue
          </button>
        </form>
      </div>
    </FormProvider>
  );
};
