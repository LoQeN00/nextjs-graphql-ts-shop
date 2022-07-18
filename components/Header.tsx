import React from 'react';
import Link from 'next/link';
import { Navlink } from './Navlink';
import { Cart } from '../components/Cart/Cart';

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="max-w-7xl mx-auto w-full">
      <nav className="bg-gray-700 px-5 py-3 text-white space-x-5 w-full flex justify-between items-center">
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
