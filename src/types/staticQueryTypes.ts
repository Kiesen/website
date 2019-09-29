import siteMeta from 'src/config/siteMeta'

export interface staticQuerySiteMetaData {
  site: {
    siteMetadata: typeof siteMeta
  }
}
