import React, { FC } from 'react'
import styled from 'styled-components'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from 'src/components/layout'
import Header from 'src/components/header'
import Meta from 'src/components/meta'

import { staticQuerySiteMetaData } from 'src/types/staticQueryTypes'
import { ThemeType } from 'src/config/theme'

const Styled404Content = styled.div`
  height: 100%;
  margin-top: 15vh;
  display: flex;
  text-align: center;
  flex-direction: column;
  p {
    font-size: ${({ theme }: { theme: ThemeType }) => theme.fontSizeParagraph};
  }
`

const NotFound: FC<{}> = () => {
  const {
    site: {
      siteMetadata: { notFound },
    },
  }: staticQuerySiteMetaData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            notFound
          }
        }
      }
    `
  )

  return (
    <>
      <Meta />
      <Layout>
        <Header />
        <Styled404Content dangerouslySetInnerHTML={{ __html: notFound }} />
      </Layout>
    </>
  )
}

export default NotFound
