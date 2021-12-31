import { FC } from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const iconSize = '35px';

const NavBar: FC<{}> = () => (
  <nav className="w-full container mx-auto">
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
        <Link href="/" passHref>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-300 to-gray-100">
            frederik aulich
          </span>
        </Link>
      </div>

      <div className="flex w-1/2 justify-end content-center">
        <a
          href={'https://github.com/kiesen'}
          rel="noreferrer"
          target="_blank"
          className="inline-block md:h-auto p-2 md:p-4"
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
          className="inline-block md:h-auto p-2 md:p-4"
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
          className="inline-block md:h-auto p-2 md:p-4"
        >
          <FaTwitter
            className="transition duration-500 ease-in-out transform hover:scale-110"
            size={iconSize}
          />
        </a>
      </div>
    </div>
  </nav>
);
export default NavBar;
