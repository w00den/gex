import Collection from 'marsdb'
import LocalForageManager from 'marsdb-localforage'

Collection.defaultStorageManager(LocalForageManager)
const variables = new Collection('variables')

exports.save = (data) => new Promise((resolve) => {
  variables.update({ name: 'counter' }, { name: 'counter', value : data }, { upsert : true })
  resolve()
})

exports.get = () => new Promise((resolve) => {
  variables.findOne({ name: 'counter' }).then((res) => {
    resolve(res)
  })
})
