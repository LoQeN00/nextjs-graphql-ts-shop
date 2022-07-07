import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { Main } from './Main';
import { NextSeo } from 'next-seo';

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
