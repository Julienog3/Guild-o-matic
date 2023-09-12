import React from 'react';

interface PageProps {
  className?: string;
  children: React.ReactNode;
}

const Page = ({ className, children }: PageProps): JSX.Element => {
  return <main className={`page w-full mt-4 ${className}`}>{children}</main>;
};

interface PageChildProps {
  children: React.ReactNode;
}

const Header = ({ children }: PageChildProps): JSX.Element => {
  return <section className="">{children}</section>;
};
Page.Header = Header;

const Content = ({ children }: PageChildProps): JSX.Element => {
  return (
    <section className="w-full flex items-center gap-4 border-b border-light-blue pb-4 my-8">
      {children}
    </section>
  );
};
Page.Content = Content;

export default Page;
