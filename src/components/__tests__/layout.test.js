import React from 'react'
import renderer from 'react-test-renderer'

import Layout from 'src/components/layout'

describe('The layout component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Layout />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
