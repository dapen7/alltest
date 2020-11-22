const { app, BrowserWindow, session } = require('electron');


const filter = {
    urls: ['http://localhost:3001/*']
}

function createWindow() {
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        console.log(details);
    });
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('src/index.html')
    win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})