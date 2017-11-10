const defaultConfig = './config-default.js'
const overrideConfig = './config-override.js'
const testConfig = './config-test.js'

const fs = require('fs')
let config = null

if (process.env.NODE_ENV === 'test') {
  // console.log(`Load ${testConfig}...`)
  config = require(testConfig)
} else {
  console.log(`Load ${defaultConfig}...`)
  config = require(defaultConfig)
  if (process.env.NODE_ENV === 'production') {
    try {
      if (fs.statSync(__dirname + `${overrideConfig.substring(1)}`).isFile()) {
        console.log(`Load ${overrideConfig}...`)
        config = Object.assign(config, require(overrideConfig))
      }
    } catch (err) {
      console.log(`Cannot load ${overrideConfig}.`)
    }
  }
}

module.exports = config
