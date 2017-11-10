const logger = require('../log4js')('restMiddleWare')

const restify = (pathPrefix = '/api/') => {
  return async (ctx, next) => {
    if (ctx.request.path.indexOf(pathPrefix) > -1) {
      ctx.json = (data, err) => {
        ctx.response.type = 'application/json'
        err = Object.assign({errcode: 0, errmsg: 'Succeed!'}, err)

        let result = {
          data,
          errcode: err.errcode,
          errmsg: err.errmsg
        }
        ctx.response.body = result
      }
      try {
        await next()
      } catch (e) {
        logger.error(process.env.NODE_ENV === 'production' ? e : e.message)
        ctx.response.status = 200
        ctx.response.type = 'application/json'
        ctx.response.body = {
          errcode: e.code || 500,
          errmsg: e.message || 'internal:unknow_error'
        }
      }
    } else {
      await next()
    }
  }
}

module.exports = restify()
