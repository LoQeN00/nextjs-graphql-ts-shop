import {
  FindAccountByEmailDocument,
  FindAccountByEmailQuery,
  FindAccountByEmailQueryVariables,
  CreateAccountDocument,
  CreateAccountMutation,
  CreateAccountMutationVariables,
  PublishAccountDocument,
  PublishAccountMutation,
  PublishAccountMutationVariables,
  CreateCartDocument,
  CreateCartMutation,
  CreateCartMutationVariables,
  SetUsersCartDocument,
  SetUsersCartMutation,
  SetUsersCartMutationVariables,
  PublishCartDocument,
  PublishCartMutation,
  PublishCartMutationVariables,
} from './../../generated/graphql';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from 'next';
import { authorizedClient } from '../../graphql/apolloClient';
import { hash } from 'bcryptjs';

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.setHeader('Allow', 'POST').status(405).json({ error: 'Method Not Allowed' });

  const body = JSON.parse(req.body) as { email: string; password: string };

  console.log(body);

  const existingUser = await authorizedClient.query<FindAccountByEmailQuery, FindAccountByEmailQueryVariables>({
    query: FindAccountByEmailDocument,
    variables: {
      email: body.email,
    },
  });

  if (existingUser.data.account) {
    res.status(400).json({ message: 'Istnieje już taki użytkownik' });
    return;
  }

  const hashedPassword = await hash(body.password, 12);

  const createUser = await authorizedClient.mutate<CreateAccountMutation, CreateAccountMutationVariables>({
    mutation: CreateAccountDocument,
    variables: {
      email: body.email,
      password: hashedPassword,
    },
  });

  if (!createUser.data?.createAccount?.id) {
    res.status(400).json({ message: 'Coś poszło nie tak' });
    return;
  }

  const publishUser = await authorizedClient.mutate<PublishAccountMutation, PublishAccountMutationVariables>({
    mutation: PublishAccountDocument,
    variables: {
      id: createUser.data?.createAccount?.id,
    },
  });

  const createCart = await authorizedClient.mutate<CreateCartMutation, CreateCartMutationVariables>({
    mutation: CreateCartDocument,
  });

  await authorizedClient.mutate<SetUsersCartMutation, SetUsersCartMutationVariables>({
    mutation: SetUsersCartDocument,
    variables: {
      accountId: createUser.data.createAccount.id,
      cartId: createCart.data?.createCart?.id!,
    },
  });

  await authorizedClient.mutate<PublishCartMutation, PublishCartMutationVariables>({
    mutation: PublishCartDocument,
    variables: {
      id: createCart.data?.createCart?.id!,
    },
  });

  res.status(201).json({ ok: true });
};

export default handler;
