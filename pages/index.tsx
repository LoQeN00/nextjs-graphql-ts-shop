import { useQuery, gql } from '@apollo/client';
import React, { useEffect } from 'react';
import { useCreateProductReviewMutation } from '../generated/graphql';

const GET_PRODUCTS = gql`
  query GetProductsList {
    products {
      id
      name
      price
      description
      images {
        url
      }
    }
  }
`;

const Home = () => {
  return (
    <div>
      <h1>Strona głowna</h1>
    </div>
  );
};

export default Home;
