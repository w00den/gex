import path from 'path'
import fs from 'fs'

const devPackage = path.resolve(process.cwd(), 'package.json')
let rawpackage = fs.readFileSync(devPackage)

export default (() => {
  return {
    package: JSON.parse(rawpackage)
  }
})()
