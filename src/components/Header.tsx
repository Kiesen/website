import { FC } from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const iconSize = '35px';

const Header: FC<{}> = () => (
  <header className="w-full p-4 flex justify-between">
    <div className="text-3xl font-semibold animate-glitch">
      <Link href="/">fa</Link>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <a
        className="animate-glitch"
        href={'https://github.com/kiesen'}
        rel="noreferrer"
        target="_blank"
      >
        <FaGithub size={iconSize} />
      </a>
      <a
        className="animate-glitch"
        href={
          'https://www.linkedin.com/in/frederik-aulich-08736a171/'
        }
        rel="noreferrer"
        target="_blank"
      >
        <FaLinkedinIn size={iconSize} />
      </a>
      <a
        className="animate-glitch"
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
