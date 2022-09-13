import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { ClipLoader } from 'react-spinners';
import { useOrderDetailsQuery } from '../../generated/graphql';
import Image from 'next/image';

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
          return (
            <div key={item.id} className="mb-4 bg-white grid grid-cols-4 p-4 rounded-xl shadow-xl">
              <div className="relative">
                <Image
                  src={item.product?.images[0].url!}
                  layout="responsive"
                  width={4}
                  height={3}
                  objectFit="contain"
                  alt={item.product?.name}
                />
              </div>
              <div className="flex items-center">
                <p>{item.product?.name}</p>
              </div>
              <div className="flex items-center">
                <p>x{item.quantity}</p>
              </div>
              <div className="flex items-center">
                <p>{item.product?.price! * item.quantity}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
