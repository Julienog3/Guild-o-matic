import React from 'react';
import Page from '../components/layout/Page';

function Settings(): JSX.Element {
  return (
    <Page>
      <div className="w-full border-b border-light-blue">
        <h2 className="text-4xl font-raleway font-semibold text-white mb-4">
          Paramètres
        </h2>
      </div>
      <div className="flex w-full h-80 items-center justify-center">
        <h2 className="text-xl font-semibold text-light-gray mb-4">
          Coming soon...
        </h2>
      </div>
    </Page>
  );
}

export default Settings;
