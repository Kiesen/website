import { FC } from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const iconSize = '35px';

type Props = {
  mainTitle: string;
  githubLink?: string;
  linkedInLink?: string;
  twitterLink?: string;
};

const NavBar: FC<Props> = ({
  mainTitle,
  githubLink,
  linkedInLink,
  twitterLink,
}) => (
  <nav className="w-full container mx-auto text-white">
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
        <Link href="/" passHref>
          <span>{mainTitle}</span>
        </Link>
      </div>

      <div className="flex w-1/2 justify-end content-center">
        {githubLink ? (
          <a
            href={githubLink}
            rel="noreferrer"
            target="_blank"
            className="inline-block md:h-auto p-2 md:p-4"
          >
            <FaGithub
              className="transition duration-500 ease-in-out transform hover:scale-110"
              size={iconSize}
            />
          </a>
        ) : null}
        {linkedInLink ? (
          <a
            href={linkedInLink}
            rel="noreferrer"
            target="_blank"
            className="inline-block md:h-auto p-2 md:p-4"
          >
            <FaLinkedinIn
              className="transition duration-500 ease-in-out transform hover:scale-110"
              size={iconSize}
            />
          </a>
        ) : null}
        {twitterLink ? (
          <a
            href={twitterLink}
            rel="noreferrer"
            target="_blank"
            className="inline-block md:h-auto p-2 md:p-4"
          >
            <FaTwitter
              className="transition duration-500 ease-in-out transform hover:scale-110"
              size={iconSize}
            />
          </a>
        ) : null}
      </div>
    </div>
  </nav>
);
export default NavBar;
