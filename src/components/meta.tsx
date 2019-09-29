import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { staticQuerySiteMetaData } from 'src/types/staticQueryTypes'

const Meta: FC<{}> = () => {
  const {
    site: {
      siteMetadata: { title },
    },
  }: staticQuerySiteMetaData = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <Helmet defaultTitle={title}>
      <meta name="docsearch:version" content="2.0" />
    </Helmet>
  )
}

export default Meta
