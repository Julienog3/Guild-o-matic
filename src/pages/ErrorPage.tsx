import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="bg-bg-blue flex w-full min-h-screen items-center justify-center">
      <div className="flex items-center  w-full flex-col ">
        <h2 className="text-3xl font-semibold text-white  max-w-2xl text-center">
          Oups ! Il semblerait que la page recherchée n&apos;existe plus
        </h2>
        <Link className="relative" to="/">
          <span className="bg-accent-blue rounded-lg p-4 text-sm text-white transition-all hover:bg-accent-blue/75">
            Retourner à l&apos;accueil
          </span>
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
