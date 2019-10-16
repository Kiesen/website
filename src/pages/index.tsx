import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from 'src/components/layout'
import Header from 'src/components/header'
import Meta from 'src/components/meta'

import Particles from 'src/animations/particles'

import { staticQuerySiteMetaData } from 'src/types/staticQueryTypes'
import { ThemeTypes } from 'src/config/theme'

const StyledCanvas = styled.canvas`
  position: fixed;
  height: 100%;
  width: 100%;
`

const StyledContent = styled.div`
  max-width: 550px;
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: ${({ theme }: { theme: ThemeTypes }) => theme.fontSizeParagraph};
  }
`

const Index: FC<{}> = () => {
  const {
    site: {
      siteMetadata: { content },
    },
  }: staticQuerySiteMetaData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            content
          }
        }
      }
    `
  )

  useEffect(() => {
    const animation = new Particles('particles', 250)
    animation.start()
  }, [])

  return (
    <>
      <Meta />
      <StyledCanvas id="particles" />
      <Layout>
        <Header />
        <StyledContent>
          {content.map((entry, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: entry }}></p>
          ))}
        </StyledContent>
      </Layout>
    </>
  )
}

export default Index
