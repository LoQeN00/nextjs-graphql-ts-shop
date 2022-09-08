import React from 'react';

import { useSession } from 'next-auth/react';
import { useFindAllAccountOrdersQuery } from '../generated/graphql';
import { ClipLoader } from 'react-spinners';
import Link from 'next/link';

type Props = {};

const OrdersPage = (props: Props) => {
  const { data: session } = useSession();

  const { data, loading, error } = useFindAllAccountOrdersQuery({
    variables: {
      id: session?.user.id!,
    },
    pollInterval: 4000,
  });

  return (
    <div>
      {loading && <ClipLoader color="#ffffff" />}
      <div className="grid grid-cols-3 space-y-3">
        <p className="text-xl font-semibold">Total</p>
        <p className="text-xl font-semibold">State</p>
        <p className="text-xl font-semibold">Details</p>
        {data?.account?.orders.map((order) => {
          return (
            <>
              <p>{order.total}</p>
              <p className={`${order.state === 'PAID' ? 'text-green-400' : 'text-orange-400'} font-semibold`}>
                {order.state}
              </p>
              <Link href={`/order/${order.id}`}>
                <a className="bg-blue-700 w-[30%] rounded-lg px-4 py-2 text-white inline-block text-center">
                  View details
                </a>
              </Link>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
