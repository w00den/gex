import React from 'react'
import PropTypes from 'prop-types'
import classes from './Counter.scss'
import { increment, doubleAsync, clear, save, load } from '../modules/counter'
import { connect } from 'react-redux'

type Props = {
  counter: number,
  doubleAsync: Function,
  increment: Function,
  clear: Function,
  save: Function,
  load: Function,
};

export class Counter extends React.Component {
  props: Props;
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    load: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
  };
  componentWillMount = () => {
    this.props.load()
  }

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
        {' '}
        <button className='btn btn-primary' onClick={this.props.clear}>
          Clear
        </button>
        {' '}
        <button className='btn btn-primary' onClick={this.props.save}>
          Save
        </button>
        {' '}
        <button className='btn btn-primary' onClick={this.props.load}>
          Load
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
  doubleAsync,
  clear,
  save,
  load
})(Counter)
