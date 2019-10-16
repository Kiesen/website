import React, { FC } from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { staticQuerySiteMetaData } from 'src/types/staticQueryTypes'

const Meta: FC<{ title: string }> = props => {
  const {
    site: {
      siteMetadata: { title, author, description },
    },
  }: staticQuerySiteMetaData = useStaticQuery(graphql`
    query SiteMetadata {
      site {
        siteMetadata {
          title
          author
          description
        }
      }
    }
  `)
  return (
    <Helmet
      htmlAttributes={{ lang: 'EN' }}
      title={props.title}
      titleTemplate={`%s | ${title}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: props.title,
        },
      ]}
    />
  )
}

export default Meta
