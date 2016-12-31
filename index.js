const { app, BrowserWindow, globalShortcut } = require('electron')
const defaultKey = 'CommandOrControl+Alt+J'

const openDevTools = () => {
  const win = BrowserWindow.getFocusedWindow()
  if (!win) return

  win.webContents.executeJavaScript(`{
    let webview = document.querySelector('.term_active webview');
    if (!webview) {
      // backward compatibility
      webview = document.querySelector('.terms_termActive webview');
    }
    if (webview && webview.openDevTools) {
      !webview.isDevToolsOpened() ?
        webview.openDevTools() :
        webview.closeDevTools();
    }
  }`)
}

const getKey = () => app.config.getConfig().openDevToolsKey || defaultKey

exports.onApp = () => {
  globalShortcut.register(getKey(), openDevTools)
}

exports.onUnload = () => {
  globalShortcut.unregister(getKey())
}