import logger from '../lib/logger'
import path from 'path'
import fs from 'fs-extra'

const srcDir = path.resolve(process.cwd())
const targetDir = path.resolve(srcDir, 'src/utils')
exports.inject = (file = {}) => new Promise((resolve, reject) => {
  if (!file || !file.fileName || !file.data) return
  const targetPath = path.resolve(targetDir, file.fileName)
  fs.writeFile(targetPath, file.data, (err) => {
    if (err) {
      return reject(err)
    } else {
      logger.success(`"${file.name}" injected successfully as ${targetPath}`)
      return resolve(true)
    }
  })
})
