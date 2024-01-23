import Link from 'next/link';
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

import staticMetaData from '@static/meta.json';

const iconSize = '35px';

export function NavBar() {
  return (
    <nav className="w-full container mx-auto mb-8 text-white">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center no-underline hover:no-underline font-bold text-3xl lg:text-4xl">
          <Link href="/" passHref>
            <span>fa</span>
          </Link>
        </div>

        <div className="flex w-1/2 justify-end content-center">
          <a
            href={staticMetaData.social.github}
            rel="noreferrer"
            target="_blank"
            className="inline-block md:h-auto p-2 md:p-3"
          >
            <FaGithub
              className="transition duration-500 ease-in-out transform hover:scale-110"
              size={iconSize}
            />
          </a>
          <a
            href={staticMetaData.social.linkedin}
            rel="noreferrer"
            target="_blank"
            className="inline-block md:h-auto p-2 md:p-3"
          >
            <FaLinkedinIn
              className="transition duration-500 ease-in-out transform hover:scale-110"
              size={iconSize}
            />
          </a>
          <a
            href={staticMetaData.social.twitter}
            rel="noreferrer"
            target="_blank"
            className="inline-block md:h-auto p-2 md:p-3"
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
}
