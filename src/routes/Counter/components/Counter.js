import React from 'react'
import PropTypes from 'prop-types'
import classes from './Counter.scss'
import { backup as dbBackup, restore as dbRestore } from 'redux/db'
import { increment, doubleAsync, clear, save, load } from '../modules/counter'
import { connect } from 'react-redux'
// const saveFile = require('electron').remote.getGlobal('saveFile')

type Props = {
  counter: number,
  dbstate: Object,
  doubleAsync: Function,
  increment: Function,
  clear: Function,
  save: Function,
  load: Function,
  dbBackup: Function,
  dbRestore: Function,
};

export class Counter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      dbstate: '',
    }
  }
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

  backup = () => {
    this.props.dbBackup()
      .then(data => console.log('method', this.props.dbstate))
      .then(data => {
        let blob = new Blob([JSON.stringify(this.props.dbstate)], { type: 'text/plain;charset=utf-8' })
        // console.log(saveFile(5))
      })
  }

  restore = () => {
    const data = [{"name":"counter","value":717,"_id":"8GFS27YrFkCEMtNKH"},{"name":"test","value":[{"name":"counter","value":53,"_id":"8GFS27YrFkCEMtNKH"}],"_id":"wtrZbnjX85d8CYbiK"}]
    this.props.dbRestore(data)
      .then(d => this.props.load())
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
        {' '}
        <button className='btn btn-primary' onClick={this.backup}>
          Save to file
        </button>
        {' '}
        <button className='btn btn-primary' onClick={this.restore}>
          Restore from file
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  dbstate: state.db
})
export default connect(mapStateToProps, {
  increment: () => increment(1),
  doubleAsync,
  clear,
  save,
  load,
  dbBackup,
  dbRestore
})(Counter)
