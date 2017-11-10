const log4js = require('koa-log4')
const levels = log4js.levels

const log = (category = 'default') => {
  let logger = log4js.getLogger(category)
  logger.setLevel(process.env.NODE_ENV === 'production' ? 'INFO' : 'DEBUG')
  return logger
}

module.exports = log
