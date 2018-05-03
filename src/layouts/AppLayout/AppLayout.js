import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VersionText from '../../components/VersionText'
import './AppLayout.scss'
import '../../styles/fontLoader.scss'
import excuse from 'utils/excuses'

class AppLayout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      excuse: 'no excuse :('
    }
  }

  componentWillMount = () => {
    this.getExcuse()
  }

  getExcuse = () => {
    excuse.then(excuse => {
      this.setState({ excuse })
    })
  }

  render = () => {
    const { excuse } = this.state
    return (
      <div className='app'>
        <div className='app-container'>
          <div className='app-layout--viewport'>
            {this.props.children}
          </div>
        </div>
        <div className='app-footer-node'>
          <div className='app-footer-container text-center'>
            <VersionText text={excuse} />
          </div>
        </div>
      </div>
    )
  }
}
AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout
