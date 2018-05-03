import Collection from 'marsdb'
import LocalForageManager from 'marsdb-localforage'

Collection.defaultStorageManager(LocalForageManager)
const variables = new Collection('variables')

exports.saveCounter = (data) => new Promise((resolve) => {
  const sdata = '[{"name":"counter","value":53,"_id":"8GFS27YrFkCEMtNKH"}]'
  const data2 = JSON.parse(sdata)
  variables.update({ name: 'counter' }, { name: 'counter', value : data }, { upsert : true })
    .then(variables.update({ name: 'test' }, { name: 'test', value : data2 }, { upsert : true }))
    .then(resolve())
})

exports.getCounter = () => new Promise((resolve) => {
  variables.findOne({ name: 'counter' })
    .then(v => {
      resolve(v)
    })
})

exports.backup = () => new Promise((resolve) => {
  variables.find().then(results => {
    resolve(results)
  })
})

exports.restore = (data) => new Promise((resolve) => {
  variables.remove({})
    .then(s => variables.insertAll(data))
    // .then(s =>
    //   Promise.all(data.map(d =>
    //     variables.insert(d)
    //   )))
    .then(f => resolve(f))
})
