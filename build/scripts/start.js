import logger from '../lib/logger'

logger.info('Starting server...')
require('../../server/main').listen(35889, () => {
  logger.success('Server is running at http://localhost:35889')
})
