const siteMeta = require('./src/config/siteMeta')

module.exports = {
  siteMetadata: { ...siteMeta },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-root-import`,
  ],
}
