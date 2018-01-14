import React from 'react'
import AppLayout from 'layouts/AppLayout'
import { shallow } from 'enzyme'

describe('(Layout) AppLayout', () => {
  it('renders as a <div>', () => {
    shallow(<AppLayout />).should.have.tagName('div')
  })

  it('renders its children inside of the viewport', () => {
    const Child = () => <h2>child</h2>
    shallow(
      <AppLayout>
        <Child />
      </AppLayout>
    )
      .find('.app-layout--viewport')
      .should.contain(<Child />)
  })
})
