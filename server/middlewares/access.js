const logger = require('../log4js')('http')

const parseUser = () => {
  return async (ctx, next) => {
    logger.info('"%s %s" "%s"', ctx.request.method,
      ctx.request.originalUrl, ctx.request.header['user-agent'])
    await next()
  }
}

module.exports = parseUser()
