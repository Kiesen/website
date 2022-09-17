import { FC } from 'react';

import staticMetaData from '@src/static/meta.json';

const Footer: FC = () => {
  const currentYear = new Date().getUTCFullYear();
  return (
    <footer className="w-full container mx-auto mt-12 text-sm text-center">
      <p className="no-underline hover:no-underline">
        &copy; {currentYear} &bull; {staticMetaData.author}
      </p>
    </footer>
  );
};

export default Footer;
