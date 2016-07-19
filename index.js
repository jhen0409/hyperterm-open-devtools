const { BrowserWindow, globalShortcut } = require('electron')
const defaultKey = 'CommandOrControl+Alt+J'

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

module.exports.onApp = app => {
  const key = app.config.getConfig().openDevToolsKey || defaultKey
  globalShortcut.register(key, openDevTools)
}

module.exports.onUnload = () => {
  const key = app.config.getConfig().openDevToolsKey || defaultKey
  globalShortcut.unregister(key)
}