import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Main } from '../components/Main';

type Props = {};

const AboutPage = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-teal-100">
      <Header />
      <Main>
        <p>Siema</p>
      </Main>
      <Footer />
    </div>
  );
};

export default AboutPage;
