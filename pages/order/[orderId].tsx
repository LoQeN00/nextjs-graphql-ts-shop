import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useOrderDetailsQuery } from '../../generated/graphql';
import Image from 'next/image';
import { OrderItem } from '../../components/Order/OrderItem';

type Props = {};

const OrderDetailsPage = (props: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const orderId = router.query.orderId as string;

  const { data, loading, error } = useOrderDetailsQuery({
    variables: {
      id: orderId,
    },
  });

  return (
    <div>
      {loading && <ClipLoader color="#ffffff" />}
      <h1 className="text-2xl text-gray-400 mb-4">
        Order <span className="text-black font-bold">{orderId}</span>
      </h1>
      <h2 className="text-2xl text-gray-400 mb-4">
        Status: <span className="text-black font-bold">{data?.order?.state}</span>
      </h2>
      <h2 className="text-2xl text-gray-400 mb-4">
        Total: <span className="text-black font-bold">{data?.order?.total}</span>
      </h2>
      <div>
        {data?.order?.orderItems.map((item) => {
          return <OrderItem key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
