import { Navlink } from '../utils/Navlink';
import { Cart } from '../Cart/Cart';
import { useDetectScrollDirection } from '../../hooks/useDetectScrollDirection';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

type Props = {};

export const Header = (props: Props) => {
  const { scrollDirection } = useDetectScrollDirection();
  const { data: session, status } = useSession();

  const [navbarIsOpened, setNavbarIsOpened] = useState(false);

  const toggleOpenNavbar = () => setNavbarIsOpened((prevState) => !prevState);

  return (
    <header
      className={`bg-gray-700 w-full fixed z-10 transition-all ease-in ${
        scrollDirection === 'down' && 'translate-y-[-100px]'
      } `}
    >
      <nav className="mx-auto px-5 py-5 text-white space-x-5 w-full hidden justify-between items-center max-w-7xl  md:flex">
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
      <nav className="md:hidden flex flex-col p-4 text-white space-y-2">
        <div className="flex justify-between">
          <Navlink href="/" text="Home" />
          <div className="flex space-x-4">
            {session && <Cart />}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
              onClick={toggleOpenNavbar}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>
        </div>
        <div className={`${navbarIsOpened ? 'block' : 'hidden'} flex flex-col space-y-2`}>
          <Navlink href="/about" text="About" />
          <Navlink href="/products-graphql" text="Products" />
          <Navlink href="/orders" text="Orders" />
        </div>
      </nav>
    </header>
  );
};
