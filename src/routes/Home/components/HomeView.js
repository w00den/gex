import React, { Component } from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

class HomeView extends Component {
  render = () => {
    return (
      <div>
        <h4>Welcome!</h4>
        <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
      </div>

    )
  }
}

export default HomeView
