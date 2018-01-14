import { argv } from 'yargs'
import webpackConfig from './webpack.config'

const TEST_BUNDLER = './tests/test-bundler.js'

const karmaConfig = {
  basePath: '../',
  // browsers: ['PhantomJS'],
  browsers: ['Chrome'],
  singleRun: !argv.watch,
  coverageReporter: {
    dir: 'coverage',
    instrumenterOptions: {
      istanbul: { noCompact: true }
    },
    reporters: [
      // reporters not supporting the `file` property
      { type: 'html', subdir: 'report-html' },
      { type: 'lcov', subdir: 'report-lcov' },
      // reporters supporting the `file` property, use `subdir` to directly
      // output them in the `dir` directory
      { type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
      { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' },
      { type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
      { type: 'text', subdir: '.', file: 'text.txt' },
      { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
    ]
  },
  files: [{
    pattern  : TEST_BUNDLER,
    watched  : false,
    served   : true,
    included : true
  },
  // './src/**/*.js',
  ],
  frameworks: ['mocha'],
  reporters: ['mocha', 'coverage'],
  preprocessors: {
    [TEST_BUNDLER]: ['webpack'],
    // './src/**/*.js': ['coverage'],
  },
  logLevel: 'WARN',
  browserConsoleLogOptions: {
    terminal: true,
    format: '%b %T: %m',
    level: '',
  },
  webpack: {
    entry: TEST_BUNDLER,
    devtool: 'cheap-module-source-map',
    module: webpackConfig.module,
    plugins: webpackConfig.plugins,
    resolve: webpackConfig.resolve,
    externals: {
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react',
    },
  },
  webpackMiddleware: {
    stats: 'errors-only',
    noInfo: true,
  },
}

module.exports = (cfg) => {
  console.log(karmaConfig.plugins)
  return cfg.set(karmaConfig)
}
