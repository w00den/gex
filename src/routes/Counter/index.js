import Counter from './components/Counter'
import reducer from './modules/counter'
import dbreducer from 'redux/db/index'
import { injectReducer } from '../../store/reducers'

export default (store) => {
  injectReducer(store, { key: 'db', reducer: dbreducer })
  injectReducer(store, { key: 'counter', reducer })
  return Counter
}
