import { FC } from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const iconSize = '35px';

const Header: FC<{}> = () => (
  <header className="w-full p-4 flex justify-between animate-glitch ">
    <div className="text-3xl font-semibold transition duration-500 ease-in-out transform hover:scale-110">
      <Link href="/">fa</Link>
    </div>
    <div className="grid grid-cols-3 gap-4">
      <a
        href={'https://github.com/kiesen'}
        rel="noreferrer"
        target="_blank"
      >
        <FaGithub
          className="transition duration-500 ease-in-out transform hover:scale-110"
          size={iconSize}
        />
      </a>
      <a
        href={
          'https://www.linkedin.com/in/frederik-aulich-08736a171/'
        }
        rel="noreferrer"
        target="_blank"
      >
        <FaLinkedinIn
          className="transition duration-500 ease-in-out transform hover:scale-110"
          size={iconSize}
        />
      </a>
      <a
        href={'https://twitter.com/frederikaulich'}
        rel="noreferrer"
        target="_blank"
      >
        <FaTwitter
          className="transition duration-500 ease-in-out transform hover:scale-110"
          size={iconSize}
        />
      </a>
    </div>
  </header>
);
export default Header;
