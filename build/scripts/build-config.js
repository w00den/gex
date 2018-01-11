import jsonfile from 'jsonfile'
import path from 'path'
import project from '../../project.config'
import fs from 'fs-extra'
import { ncp } from 'ncp'
let jsonObj = {}

const srcDir = path.resolve(process.cwd())
const dstDir = path.resolve(process.cwd(), project.outBase)
const devPackage = path.resolve(srcDir, 'package.json')
const appPackage = path.resolve(dstDir, 'package.json')
jsonfile.readFile(devPackage, (err, obj) => {
  if (err) {
    throw new Error(err)
  } else {
    jsonObj = {
      'name': obj.name,
      'productName': obj.build.productName,
      'version': obj.version,
      'description': obj.description,
      'author': obj.author,
      'private': true,
      'license': obj.license,
      'main': obj.main,
      'dependencies': obj.dependencies
    }
    fs.mkdirs(dstDir, () => {
      ncp(
        path.resolve(srcDir, 'main.js'),
        path.resolve(dstDir, 'main.js')
      )
      jsonfile.writeFile(appPackage, jsonObj, (err) => {
        if (err) {
          throw new Error(err)
        }
      })
    })
  }
})
