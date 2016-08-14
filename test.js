const fs = require('fs')
const path = require('path')
const { homedir } = require('os');
const { expect } = require('chai')
const { Application } = require('spectron');
const robot = require('robotjs')

const pluginPath = path.join(
  homedir(),
  '.hyperterm_plugins/node_modules/hyperterm-open-devtools'
)
const delay = time => new Promise(resolve => setTimeout(resolve, time))
const waitUntilPackageInstalled = () =>
  new Promise(resolve => {
    const packageInstalled = () => {
      if (fs.existsSync(pluginPath)) {
        resolve()
      } else {
        setTimeout(packageInstalled, 200)
      }
    }
    packageInstalled()
  })

describe('Open devtools', function spec() {
  this.timeout(10000)

  before(() => {
    const configPath = path.join(__dirname, 'HyperTerm.app/Contents/Resources/app/config.js')
    const configCode = fs.readFileSync(configPath, 'utf-8');
    fs.writeFileSync(
      configPath,
      configCode.replace('.hyperterm.js', '.test-hyperterm.js')
    )
    this.app = new Application({
      path: path.join(__dirname, 'HyperTerm.app/Contents/MacOS/HyperTerm'),
      args: [],
    })
    return this.app.start()
  })

  after(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('should open devtools on web page', () => {
    const { client } = this.app
    let oldCount
    return client.waitUntilWindowLoaded()
      .then(() => delay(2000))
      .then(() => client.windowByIndex(1))
      .then(waitUntilPackageInstalled)
      .then(() => {
        const url = 'github.com'
        for (const key of url) {
          robot.keyTap(key)
        }
        robot.keyTap('enter')
      })
      .then(() => delay(1000))
      .then(this.app.client.getWindowCount)
      .then(count => {
        oldCount = count
        robot.keyTap('j', ['command', 'alt'])
      })
      .then(this.app.client.getWindowCount)
      .then(count => {
        expect(count).to.equal(oldCount + 1)
      })
      .then(() => delay(2000))
  })
})
