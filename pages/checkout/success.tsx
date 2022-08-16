import React from 'react';
import { useRouter } from 'next/router';

type Props = {};

const SuccessPage = (props: Props) => {
  const router = useRouter();

  return (
    <div>
      <h1>SuccessPage</h1>
    </div>
  );
};

export default SuccessPage;
