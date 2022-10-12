import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {
  href: string;
  text: string;
  onClick?: () => void;
};

export const Navlink = ({ href, text, onClick }: Props) => {
  const router = useRouter();
  return (
    <Link href={href}>
      <a className={router.pathname === href ? `text-teal-500 text-xl` : `text-xl`} onClick={onClick}>
        {text}
      </a>
    </Link>
  );
};
