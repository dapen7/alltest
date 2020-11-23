const { app, BrowserWindow, session } = require('electron');


const filter = {
    urls: ['http://localhost:3001/*']
}

function createWindow() {
    // session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    //     console.log("onBeforeRequest");
    //     callback({ requestHeaders: details.requestHeaders });
    // });
    // session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
    //     console.log("onBeforeSendHeaders");
    //     callback({ requestHeaders: details.requestHeaders });
    // });
    // session.defaultSession.webRequest.onSendHeaders(filter, (details) => {
    //     console.log("onSendHeaders");
    // });
    // session.defaultSession.webRequest.onHeadersReceived(filter, (details, callback) => {
    //     console.log("onHeadersReceived");
    //     callback({ responseHeaders: details.responseHeaders, statusLine: details.statusLine });
    // });
    // session.defaultSession.webRequest.onResponseStarted(filter, (details) => {
    //     console.log("onResponseStarted");
    // });
    // session.defaultSession.webRequest.onCompleted(filter, (details) => {
    //     console.log("onCompleted");
    // });

    // session.defaultSession.webRequest.onBeforeRedirect(filter, (details) => {
    //     console.log("onBeforeRedirect");
    // });
    // session.defaultSession.webRequest.onErrorOccurred(filter, (details) => {
    //     console.log("onErrorOccurred");
    // });
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation:false
        }
    })

    // win.loadFile('src/index.html');
    //https://chromedevtools.github.io/devtools-protocol/tot/Network/
    //https://www.electronjs.org/docs/api/debugger
    win.loadURL("http://localhost:3000");
    win.webContents.openDevTools();

    let requestId;
    win.webContents.debugger.attach('1.1');
    win.webContents.debugger.sendCommand('Network.enable');
    win.webContents.debugger.on('message', (event, method, params) => {
        if(method === 'Network.requestWillBeSentExtraInfo'){
            requestId = "";
        }
        if (method === 'Network.responseReceived') {
            if (params.response.url.indexOf('http://localhost:3001') != -1) {
                requestId = params.requestId;
                if(requestId){
                    win.webContents.debugger.sendCommand('Network.getResponseBody', { "requestId": requestId }).then(function({body,base64Encoded}){
                        console.log(body);
                    })
                }
            }
        }
        if(method === 'Network.loadingFailed'){
            console.log("网络错误:"+params.errorText);
        }
    });
}

app.whenReady().then(createWindow);

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