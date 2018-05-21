const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;
let isInBack = false;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({ transparent: true, frame: false, type: 'toolbar'});
  mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  var appIcon = new Tray(`${__dirname}/icon.ico`);
  var contextMenu = Menu.buildFromTemplate([
    //{label: 'Item1', type: 'radio'},
    // { label: 'Item', type: 'checkbox' },
    {
      label: 'Relocate', click: function () {
        mainWindow.setPosition(Math.round(width - 770), Math.round(0));
      }
    },
    {
      label: 'Quit', click: function () {
        app.isQuiting = true
        app.quit()
      }
    }
  ])
  appIcon.setToolTip('Ageta');
  appIcon.setContextMenu(contextMenu);

  appIcon.on('click', (event, bounds) => {
    if (!isInBack) {
      mainWindow.show()
    } else {
      mainWindow.hide()
    }
    isInBack = !isInBack;
  });

  mainWindow.on('close', function (event) {
    mainWindow = null
  })

  mainWindow.on('minimize', function (event) {
    event.preventDefault()
    mainWindow.hide()
  })

  mainWindow.on('show', function () {
    appIcon.setHighlightMode('always')
  })

  mainWindow.setTitle("Ageta");
  mainWindow.setAlwaysOnTop(true, "floating", 1);
  mainWindow.setVisibleOnAllWorkspaces(true);
  //mainWindow.webContents.openDevTools();
}

app.on('ready', function () {
  createWindow();
  globalShortcut.register('CommandOrControl+X', () => {
    mainWindow.webContents.openDevTools();
  })
  globalShortcut.register('CommandOrControl+Q', () => {
    app.quit()
  })
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});

let { ipcMain } = electron;
ipcMain.on('resize', function (e, x, y) {
  win.setSize(x, y);
  alert(x + "--------->" + y);
});
