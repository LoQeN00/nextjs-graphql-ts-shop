import React from 'react';

interface MainProps {
  children: React.ReactNode;
}

export const Main = ({ children }: MainProps) => {
  return <main className="flex-1 max-w-7xl mx-auto p-6 w-full">{children}</main>;
};
