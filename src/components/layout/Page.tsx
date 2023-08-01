import React from 'react';

interface PageProps {
  className?: string;
  children: React.ReactNode;
}

const Page = ({ className, children }: PageProps): JSX.Element => {
  return (
    <main className={`page w-full mt-12 px-8 ${className}`}>{children}</main>
  );
};

export default Page;
