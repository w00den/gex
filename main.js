const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
const nativeImage = electron.nativeImage
const appIcon = nativeImage.createFromPath(process.env.NODE_ENV === 'development'
  ? './public/assets/icons/win/icon.ico'
  : './assets/icons/win/icon.ico'
)

if (process.env.NODE_ENV === 'development') {
  require('babel-register')
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: appIcon,
    title: 'gex'
  })

  // and load the index.html of the app.
  process.env.NODE_ENV === 'development' ? mainWindow.loadURL(`http://localhost:35889/index.html`)
    : mainWindow.loadURL(`file://${__dirname}/dist/index.html`)

  // Open the DevTools.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.openDevTools()
  }

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

global.saveFile = function (f) {
  // TODO: get rid of global and
  // write save method on download file event
  return f * f
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
