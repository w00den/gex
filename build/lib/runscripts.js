import { inject } from './inject'
import logger from '../lib/logger'
import serverExports from '../lib/serverExports'
// Need to support Node versions that don't support spreading function arguments

exports.run = (args) => new Promise((resolve, reject) => {
  // logger.warn(serverExports)
  const tasks = Promise.resolve()
    .then(() => logger.info('Injecting files...'))
    .then(() => inject({
      name: 'Server exports',
      fileName: 'serverExports.js',
      data: `export default ${JSON.stringify(serverExports)}`,
    }))

  resolve(tasks)
})
