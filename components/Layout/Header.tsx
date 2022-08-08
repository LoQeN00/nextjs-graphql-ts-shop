import React from 'react';
import Link from 'next/link';
import { Navlink } from '../utils/Navlink';
import { Cart } from '../Cart/Cart';
import { useDetectScrollDirection } from '../../hooks/useDetectScrollDirection';

type Props = {};

export const Header = (props: Props) => {
  const { scrollDirection } = useDetectScrollDirection();

  return (
    <header
      className={`bg-gray-700 w-full fixed z-10 transition-all ease-in ${
        scrollDirection === 'down' && 'translate-y-[-100px]'
      } `}
    >
      <nav className="mx-auto px-5 py-5 text-white space-x-5 w-full flex justify-between items-center max-w-7xl ">
        <div className="space-x-6">
          <Navlink href="/" text="Home" />
          <Navlink href="/about" text="About" />
          <Navlink href="/products-graphql" text="Products" />
        </div>
        <div>
          <Cart />
        </div>
      </nav>
    </header>
  );
};
