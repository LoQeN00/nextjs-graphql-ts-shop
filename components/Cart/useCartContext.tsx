import React, { useContext } from 'react';
import { CartContext } from './CartContext';

export const useCartContext = () => {
  const cartState = useContext(CartContext);

  if (!cartState) throw new Error(`You forgot CartStateContextProvider`);

  return cartState;
};
