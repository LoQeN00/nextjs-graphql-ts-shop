import { Navlink } from '../utils/Navlink';
import { Cart } from '../Cart/Cart';
import { useDetectScrollDirection } from '../../hooks/useDetectScrollDirection';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

type Props = {};

export const Header = (props: Props) => {
  const { scrollDirection } = useDetectScrollDirection();
  const { data: session, status } = useSession();

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
          <Navlink href="/orders" text="Orders" />
        </div>
        <p>{session?.user.email}</p>
        <div className="space-x-4">
          {session && <Cart />}

          {status === 'authenticated' ? (
            <button onClick={() => signOut()}>Wyloguj</button>
          ) : (
            <div className="space-x-4">
              <button className="bg-teal-500 px-4 py-2 rounded-xl" onClick={() => signIn()}>
                Zaloguj
              </button>
              <Link href="/signup">
                <button className="bg-teal-500 px-4 py-2 rounded-xl">Zarejestruj się</button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
