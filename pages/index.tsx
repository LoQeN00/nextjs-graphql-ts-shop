import { NewsletterForm } from '../components/Newsletter/NewsletterForm';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div>
      <h1>Strona głowna</h1>
      <NewsletterForm />
    </div>
  );
};

export default Home;
