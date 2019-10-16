import React, { FC } from 'react'
import styled from 'styled-components'
import { Link, graphql, useStaticQuery } from 'gatsby'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import { BASE } from 'src/constants/routes'
import * as icons from 'src/constants/icons'

import { staticQuerySiteMetaData } from 'src/types/staticQueryTypes'

import { ThemeTypes } from 'src/config/theme'

const iconMap = new Map()
iconMap.set(icons.GITHUB, <FontAwesomeIcon icon={faGithub} />)
iconMap.set(icons.LINKEDIN, <FontAwesomeIcon icon={faLinkedinIn} />)
iconMap.set(icons.TWITTER, <FontAwesomeIcon icon={faTwitter} />)

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    font-size: ${({ theme }: { theme: ThemeTypes }) => theme.fontSizeH1};
    font-weight: ${({ theme }: { theme: ThemeTypes }) => theme.fontWeightBold};
    margin: ${({ theme }: { theme: ThemeTypes }) => theme.marginH1} 0;
  }

  div:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: 15px;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  div:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }

  > a {
    display: flex;
  }
`

const StyledNavigation = styled.nav`
  display: flex;

  a:not(:last-child) {
    margin-right: 20px;
  }

  svg {
    font-size: 25px;
  }

  a:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    bottom: -10px;
    background-color: #000;
    visibility: hidden;
    -webkit-transform: scaleX(0);
    transform: scaleX(0);
    -webkit-transition: all 0.3s ease-in-out 0s;
    transition: all 0.3s ease-in-out 0s;
  }

  a:hover:before {
    visibility: visible;
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
  }
`
const Header: FC<{}> = () => {
  const {
    site: {
      siteMetadata: { social },
    },
  }: staticQuerySiteMetaData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            social {
              url
              key
            }
          }
        }
      }
    `
  )

  return (
    <StyledHeader>
      <Link to={BASE}>
        <div>Frederik Aulich</div>
      </Link>
      <StyledNavigation>
        {social.map((entry, i) => (
          <a key={i} href={entry.url}>
            {iconMap.get(entry.key)}
          </a>
        ))}
      </StyledNavigation>
    </StyledHeader>
  )
}

export default Header
