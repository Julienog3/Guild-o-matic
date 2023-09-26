import { MDXProvider } from '@mdx-js/react';
import PrivacyPolicy from '../assets/privacy-policy.mdx';
import React from 'react';
import { ScrollRestoration } from 'react-router-dom';

const PrivacyPolicyPage = (): JSX.Element => {
  return (
    <>
      <ScrollRestoration />
      <div>
        <div className="max-w-full prose text-light-gray prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold">
          <MDXProvider>
            <PrivacyPolicy />
          </MDXProvider>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
