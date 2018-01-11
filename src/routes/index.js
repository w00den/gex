import React from 'react'
import { Switch, Route } from 'react-router'

// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
import PageLayout from 'layouts/PageLayout/PageLayout'
import Home from './Home'
import Counter from './Counter'

export default (store) => {
  return (
    <PageLayout>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter(store)} />
      </Switch>
    </PageLayout>
  )
}
