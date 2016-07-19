const { BrowserWindow, globalShortcut } = require('electron')
const defaultKey = 'CommandOrControl+Alt+J'
let key;

const openDevTools = () => {
  const win = BrowserWindow.getFocusedWindow();
  if (!win) return;

  win.webContents.executeJavaScript(`{
    const webview = document.querySelector('.terms_termActive webview');
    if (webview && webview.openDevTools) {
      !webview.isDevToolsOpened() ?
        webview.openDevTools() :
        webview.closeDevTools();
    }
  }`);
}

exports.onApp = app => {
  key = app.config.getConfig().openDevToolsKey || defaultKey
  globalShortcut.register(key, openDevTools)
}

exports.onUnload = () => {
  if (!key) return;
  globalShortcut.unregister(key)
}