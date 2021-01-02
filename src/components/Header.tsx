import NextLink from 'next/link';
import { FC } from 'react';
import { FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

type HeaderProps = {
  position?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';
};

const iconSize = '25px';

const Header: FC<HeaderProps> = ({ position }) => (
  <header
    className={`w-full flex items-center justify-between ${position}`}
  >
    <h1 className="text-2xl font-extrabold py-2">
      <NextLink href="/">Frederik Aulich</NextLink>
    </h1>
    <div className="grid grid-cols-3 gap-4">
      <a
        href={'https://github.com/kiesen'}
        rel="noreferrer"
        target="_blank"
      >
        <FaGithub size={iconSize} />
      </a>
      <a
        href={
          'https://www.linkedin.com/in/frederik-aulich-08736a171/'
        }
        rel="noreferrer"
        target="_blank"
      >
        <FaLinkedinIn size={iconSize} />
      </a>
      <a
        href={'https://twitter.com/frederikaulich'}
        rel="noreferrer"
        target="_blank"
      >
        <FaTwitter size={iconSize} />
      </a>
    </div>
  </header>
);
export default Header;
