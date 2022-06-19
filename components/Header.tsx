import React from 'react';
import Link from 'next/link';
import { Navlink } from './Navlink';

type Props = {};

export const Header = (props: Props) => {
  return (
    <header className="max-w-7xl mx-auto w-full">
      <nav className="bg-gray-700 px-4 py-2 text-white space-x-5">
        <Navlink href="/" text="Home" />
        <Navlink href="/about" text="About" />
        <Navlink href="/products" text="Products" />
      </nav>
    </header>
  );
};
