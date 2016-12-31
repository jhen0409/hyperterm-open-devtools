# hyperterm-open-devtools [![Build Status](https://travis-ci.org/jhen0409/hyperterm-open-devtools.svg?branch=master)](https://travis-ci.org/jhen0409/hyperterm-open-devtools)

> Open DevTools for currently showing web page with a hotkey on [Hyper](https://hyper.is)

![Screenshot](https://cloud.githubusercontent.com/assets/3001525/16934145/35968d36-4d86-11e6-8f1f-affcc9c07543.gif)

## Install

Add `hyperterm-open-devtools` to the plugins list in your `~/.hyper.js` config file.

## Config of hotkey

The hotkey is default by `CommandOrControl+Alt+J`, you can set `openDevToolsKey` in `~/.hyper.js` config file:

```
config: {
  ...
  openDevToolsKey: 'CommandOrControl+Alt+K'
}
```

You need restart app to apply the config.

## How to install extension to devtools of webview use?

You can use [hyperterm-install-devtools](https://github.com/jhen0409/hyperterm-install-devtools) to install devtools extension in Hyper.

## Test

```bash
$ ./fetch-hyper.sh
$ npm test
```

## License

[MIT](LICENSE.md)
