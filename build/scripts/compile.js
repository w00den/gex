import { ncp } from 'ncp'
import path from 'path'
import chalk from 'chalk'
import webpack from 'webpack'
import logger from '../lib/logger'
import runscripts from '../lib/runscripts'
import webpackConfig from '../webpack.config'
import project from '../../project.config'

const runWebpackCompiler = (webpackConfig) =>
  new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        logger.error('Webpack compiler encountered a fatal error.', err)
        return reject(err)
      }

      const jsonStats = stats.toJson()
      if (jsonStats.errors.length > 0) {
        logger.error('Webpack compiler encountered errors.')
        logger.log(jsonStats.errors.join('\n'))
        return reject(new Error('Webpack compiler encountered errors'))
      } else if (jsonStats.warnings.length > 0) {
        logger.warn('Webpack compiler encountered warnings.')
        logger.log(jsonStats.warnings.join('\n'))
      }
      resolve(stats)
    })
  })

const compile = () => Promise.resolve()
  .then(() => logger.info('Running scripts...'))
  .then(() => runscripts.run())
  .then(() => logger.info('Starting compiler...'))
  .then(() => logger.info('Target application environment: ' + chalk.bold(project.env)))
  .then(() => runWebpackCompiler(webpackConfig))
  .then((stats) => {
    logger.info(`Copying static assets from ./public to ./${project.outDir}.`)
    ncp(
      path.resolve(project.basePath, 'public'),
      path.resolve(project.basePath, project.outDir)
    )
    return stats
  })
  .then((stats) => {
    if (project.verbose) {
      logger.log(stats.toString({
        colors: true,
        chunks: false,
      }))
    }
    logger.success(`Compiler finished successfully! See ./${project.outDir}.`)
  })
  .catch((err) => logger.error('Compiler encountered errors.', err))

compile()
