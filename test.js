const fs = require('fs')
const path = require('path')
const { homedir } = require('os');
const { expect } = require('chai')
const { Application } = require('spectron');
const robot = require('robotjs')

const delay = time => new Promise(resolve => setTimeout(resolve, time))
const hypertermPath = path.join(__dirname, 'HyperTerm.app/Contents')

const replaceCode = (filePath, from, to) => {
  fs.writeFileSync(
    filePath,
    fs.readFileSync(filePath, 'utf-8')
      .replace(from, to)
  )
}

[
  [`${homedir()}/.test-hyperterm.js`, 'LOCAL_PACKAGE', process.cwd()],
  [`${hypertermPath}/Resources/app/config.js`, '.hyperterm.js', '.test-hyperterm.js'],
  [`${hypertermPath}/Resources/app/plugins.js`, '.hyperterm_plugins', '.test-hyperterm_plugins']
].forEach(args => replaceCode.apply(this, args))

describe('Open devtools', function spec() {
  this.timeout(10000)

  before(() => {
    this.app = new Application({
      path: `${hypertermPath}/MacOS/HyperTerm`,
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
        // Custom openDevToolsKey by .test-hyperterm.js
        robot.keyTap('k', ['command', 'alt'])
      })
      .then(this.app.client.getWindowCount)
      .then(count => {
        expect(count).to.equal(oldCount + 1)
      })
      .then(() => delay(2000))
  })
})
