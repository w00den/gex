import Counter from './components/Counter'
import reducer from './modules/counter'
import { injectReducer } from '../../store/reducers'

export default (store) => {
  injectReducer(store, { key: 'counter', reducer })
  return Counter
}
