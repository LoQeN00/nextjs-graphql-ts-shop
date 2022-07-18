import { useQuery, gql } from '@apollo/client';
import React, {useEffect} from 'react';

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


`

const Home = () => {

  const {data, loading, error} = useQuery(GET_PRODUCTS);

  console.log(data)
  
    
  return (
    <div>STRONA GŁÓWNA</div>
  );
};

export default Home;
