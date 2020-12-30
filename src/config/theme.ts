import { createGlobalStyle } from 'styled-components'

export const theme = {
  fontSizeH1: '2em',
  fontSizeParagraph: '1.5em',

  marginH1: '0.67em',

  fontWeightLight: '300',
  fontWeightNormal: '400',
  fontWeightBold: '700',

  primaryColor: '#000',
  backgroundColor: '#FEFEFE',

  githubColor: '#6E5494',
  twitterColor: '#1DA1F2',
  linkedInColor: '#0077B5',
}

export type ThemeTypes = typeof theme

export const GlobalStyle = createGlobalStyle`

  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Lato', sans-serif;
    background-color: ${({ theme }: { theme: ThemeTypes }) =>
      theme.backgroundColor}; 
  }

  p {
    font-weight: ${({ theme }: { theme: ThemeTypes }) =>
      theme.fontWeightLight}; 
  }

  a {
    position: relative;
    text-decoration: none;
    color: ${({ theme }: { theme: ThemeTypes }) => theme.primaryColor};
  }
`