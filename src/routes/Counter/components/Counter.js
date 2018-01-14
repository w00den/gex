import React from 'react'
import PropTypes from 'prop-types'
import classes from './Counter.scss'
import { increment, doubleAsync } from '../modules/counter'
import { connect } from 'react-redux'

type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function
};

export class Counter extends React.Component {
  props: Props;
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render = () => {
    return (
      <div style={{ margin: '5rem auto' }} className='text-center'>
        <h2>
          <span className='counter-text'>
            Sample Counter:
          </span>
          {' '}
          <span className={classes['counter--green']}>{this.props.counter}</span>
        </h2>
        <button className='btn btn-default' onClick={this.props.increment}>
          Increment
        </button>
        {' '}
        <button className='btn btn-primary' onClick={this.props.doubleAsync}>
          Double (Async)
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})
export default connect(mapStateToProps, {
  increment: () => increment(1),
  doubleAsync
})(Counter)
