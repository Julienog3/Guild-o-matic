import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (): JSX.Element => {
  return (
    <footer className="border-t border-light-blue h-40 p-6 flex items-center justify-between text-sm text-light-gray">
      <p>© Guild-o-matic 2023 - Tout droit reservé</p>
      <ul className="flex gap-4">
        <li>
          <Link to="faq">FAQ</Link>
        </li>
        <li>
          <Link to="legal">Légales</Link>
        </li>
        <li>
          <Link to="privacy-policy">Politique de confidentialité</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
