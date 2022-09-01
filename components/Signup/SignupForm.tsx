import React from 'react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../utils/Input';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';

type Props = {};

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

export type SignupFormData = yup.InferType<typeof schema>;

export const SignupForm = (props: Props) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const methods = useForm<SignupFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: SignupFormData) => {
    console.log(data);
    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    const json = await response.json();

    if (json.ok) {
      router.push('/api/auth/signin');
    }
  };

  if (status === 'authenticated') {
    signIn('credentials');
    return null;
  }

  return (
    <FormProvider {...methods}>
      <div>
        <h1 className="mb-4 font-semibold text-2xl">Zarejestruj się</h1>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
          <Input className="w-full" id="email" label="Email" type="email" />
          <Input className="w-full" id="password" label="Password" type="password" />
          <button type="submit" className="px-4 py-2 rounded-full bg-blue-700 text-white">
            Zarejestruj się
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-full bg-blue-700 text-white"
            onClick={() => signIn('credentials')}
          >
            Masz konto? Zaloguj się
          </button>
        </form>
      </div>
    </FormProvider>
  );
};
