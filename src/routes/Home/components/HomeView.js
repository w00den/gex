import React, { Component } from 'react'
import DuckImage from '../assets/Duck.jpg'
import './HomeView.scss'

class HomeView extends Component {
  render = () => {
    return (
      <div>
        <h1>Welcome!</h1>
        <img alt='This is a duck, because Redux!' className='duck' src={DuckImage} />
      </div>

    )
  }
}

export default HomeView
