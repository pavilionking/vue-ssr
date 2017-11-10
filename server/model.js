const fs = require('fs')
const db = require('./db')
const path = require('path')
const logger = require('./log4js')('model')

const exportModels = (path) => {
  let files = fs.readdirSync(path)
  let js_files = files.filter((f) => {
    return f.endsWith('.js')
  })

  for (let f of js_files) {
    logger.debug(`import model from file ${f}...`)
    let name = f.substring(0, f.length - 3)
    module.exports[name] = require(path + '/' + f)
  }
  for (let f of files) {
    if (fs.statSync(path + '/' + f).isDirectory()) {
      exportModels(path + '/' + f)
    }
  }
}

module.exports = {}
exportModels(path.resolve(__dirname, "./models"))

module.exports.sync = () => {
  db.sync()
}
