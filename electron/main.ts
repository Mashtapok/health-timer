import { app, BrowserWindow, Tray, Menu, nativeImage, Notification } from 'electron'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')
let tray = null

let win: BrowserWindow | null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  const iconPath = path.join(process.env.PUBLIC, '/trayTemplate.png')
  // convert some image to icon format
  // const image = nativeImage.createFromPath(path.join(process.env.PUBLIC, '/icon.png')).resize({width: 16, height: 16})
  // console.log(image)

  tray = new Tray(iconPath)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ])
  tray.setToolTip('Health timer')
  tray.setContextMenu(contextMenu)

  setTimeout(() => {
    new Notification({
      title: 'Заголовок',
      subtitle: 'Текст лол :)',
    }).show()
  }, 5000)
  win.webContents.openDevTools() // ONLY FOR DEV
}

app.on('window-all-closed', () => {
  win = null
})

app.whenReady().then(createWindow)
