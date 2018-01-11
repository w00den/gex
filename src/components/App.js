import React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { HashRouter } from 'react-router-dom'

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <HashRouter>
            {this.props.routes}
          </HashRouter>
        </div>
      </Provider>
    )
  }
}

export default App
