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
    fetchPolicy: 'network-only',
  });

  return (
    <div>
      <table className="w-full table-auto space-y-4 border-separate border-spacing-4">
        <thead>
          <tr className="text-center">
            <th className="text-xl font-semibold">Total</th>
            <th className="text-xl font-semibold">State</th>
            <th className="text-xl font-semibold">Details</th>
          </tr>
        </thead>
        <tbody>
          {data?.account?.orders.map((order) => {
            return (
              <tr key={order.id} className="text-center">
                <td>{order.total}</td>
                <td>
                  <p className={`${order.state === 'PAID' ? 'text-green-400' : 'text-orange-400'} font-semibold`}>
                    {order.state}
                  </p>
                </td>
                <td>
                  <Link href={`/order/${order.id}`}>
                    <a className="rounded-lg px-6 py-2 text-white inline-block text-center bg-blue-700">View</a>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
