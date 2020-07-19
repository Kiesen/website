import NextLink from 'next/link';
import React, { FC } from 'react';
import { Flex, Heading, Link } from '@chakra-ui/core';
import { FaGithub, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const iconSize = '25px';

const Header: FC<{}> = () => (
  <Flex
    w="100%"
    alignItems="center"
    justifyContent="space-between"
    paddingX="1.2rem"
  >
    <Heading as="h1" size="xl" fontWeight="800" paddingY="1.2rem">
      <NextLink href="/">Frederik Aulich</NextLink>
    </Heading>
    <Flex w="110px" justifyContent="space-between">
      <Link href={'https://github.com/kiesen'} isExternal>
        <FaGithub size={iconSize} />
      </Link>
      <Link
        href={
          'https://www.linkedin.com/in/frederik-aulich-08736a171/'
        }
        isExternal
      >
        <FaLinkedinIn size={iconSize} />
      </Link>
      <Link href={'https://twitter.com/frederikaulich'} isExternal>
        <FaTwitter size={iconSize} />
      </Link>
    </Flex>
  </Flex>
);
export default Header;
