const {
    app,
    BrowserWindow,
    ipcMain
} = require('electron')
const windowStateKeeper = require('electron-window-state')
let mainWindow;

const path = require('path');
const url = require('url');

const createWindow = () => {
    const dimensions = {
        minWidth: 800,
        minHeight: 600
    };

    let state = windowStateKeeper({
        defaultWidth: dimensions.minWidth,
        defaultHeight: dimensions.minHeight
    })
    
    mainWindow = new BrowserWindow({
        x: state.x,
        y: state.y,
        width: state.width,
        height: state.height,
        minWidth: dimensions.minWidth,
        minHeight: dimensions.minHeight,
        webPreferences: {
            nodeIntegration: true
        }
    })

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    
    mainWindow.loadURL(startUrl);

    //Manage new window state
    state.manage(mainWindow)
    
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.whenReady().then(() => {
    createWindow();
    
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', function () {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit()
        }
    });
});