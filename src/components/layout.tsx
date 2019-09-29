import React, { FC } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { GlobalStyle, theme } from 'src/config/theme'

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0 20px;
  height: 100vh;
`

const Layout: FC<{}> = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      <StyledLayout>{children}</StyledLayout>
    </>
  </ThemeProvider>
)

export default Layout
