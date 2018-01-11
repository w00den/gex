import opn from 'opn'
import path from 'path'
import { basePath } from '../../project.config'

const electron = path.resolve(basePath, 'node_modules/.bin/electron')

opn(basePath, { app: electron, wait: false })
process.exit()
