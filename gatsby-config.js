const siteMeta = require('./src/config/siteMeta')

module.exports = {
  siteMetadata: { ...siteMeta },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Frederik Aulich`,
        short_name: `FA`,
        start_url: `/`,
        background_color: `#FEFEFE`,
        theme_color: `#FEFEFE`,
        icon: `src/images/favicon.png`,
        display: `standalone`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
