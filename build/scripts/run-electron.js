import opn from 'opn'
import { basePath } from '../../project.config'

opn('', { app: ['electron', basePath], wait: false })
process.exit(0)
