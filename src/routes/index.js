import React from 'react'
import { Switch, Route } from 'react-router'
import AppLayout from 'layouts/AppLayout'
import Home from './Home'
import Counter from './Counter'

export default (store) => {
  return (
    <AppLayout>
      <Switch>
        <Route exact path='/' component={Counter(store)} />
        <Route path='/counter' component={Home} />
      </Switch>
    </AppLayout>
  )
}
