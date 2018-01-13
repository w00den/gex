import React from 'react'
import PropTypes from 'prop-types'
import VersionText from '../../components/VersionText'
import './AppLayout.scss'
import '../../styles/fontLoader.scss'

export const AppLayout = ({ children }) => (
  <div className='app'>
    <div className='app-container'>
      <div className='app-layout--viewport'>
        {children}
      </div>
    </div>
    <div className='app-footer-node'>
      <div className='app-footer-container text-center'>
        <VersionText />
      </div>
    </div>
  </div>
)
AppLayout.propTypes = {
  children: PropTypes.node,
}

export default AppLayout
