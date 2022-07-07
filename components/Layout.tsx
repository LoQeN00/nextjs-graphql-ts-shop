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
      <NextSeo
        openGraph={{
          url: 'https://www.url.ie/a',
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
              type: 'image/jpeg',
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' },
          ],
        }}
      />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};
