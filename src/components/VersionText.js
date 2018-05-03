import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { _package } from 'utils/common'
import './VersionText.scss'

class VersionText extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      offset: 0
    }
  }

  renderVersion = (text) => {
    text = text.replace(/\s/g, '\u00a0')
    let result = ((text || '').split('')).map((letter, key) => {
      const duration = 1000
      const delay = ~~(key / text.length * duration)
      return (<span key={key} style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay - duration}ms`
      }}>{letter}</span>)
    })
    return result
  }

  render = () => {
    const version = _package.version
    const { text } = this.props
    return (
      <div className='animated-text'>
        <div>{this.renderVersion(`¯\\_(ツ)_/¯          v${version}          ¯\\_(ツ)_/¯`)}</div>
        <div>{this.renderVersion(text)}</div>
      </div>
    )
  }
}

export default VersionText
