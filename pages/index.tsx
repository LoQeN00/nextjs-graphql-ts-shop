import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { ProductListItem } from '../components/ProductListItem';
import { Main } from '../components/Main';
import { Layout } from '../components/Layout';

const DATA = {
  description: ` Lorem ipsum dolor sit amet. Qui expedita aperiam aut voluptas vero qui repellat rerum est modi nihil ut
  corrupti quam non rerum neque. Ut galisum quia ut quibusdam sapiente et aliquid facere aut minus velit et
  dolore exercitationem quo eveniet alias qui magni assumenda. Et quasi eveniet est recusandae distinctio aut
  voluptate tempore. Nam incidunt cumque ut velit debitis eum quae impedit vel temporibus saepe aut deserunt
  quos ad consequatur officia.`,
  thumbnailUrl: `https://picsum.photos/id/1060/536/354`,
  thumbnailAlt: `Barista lejący kawę`,
  rating: 6,
  title: 'Przykładowy tytuł',
  id: 123,
  price: 123,
};

const Home = () => {
  return <ProductListItem data={DATA} />;
};

export default Home;
