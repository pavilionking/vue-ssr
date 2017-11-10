const permissions = require('../configs/config-permissions')
const jwt = require('jsonwebtoken')
const config = require('../configs/config')
const logger = require('../log4js')('authrizeMiddleware')
// const userSessionService = require('../services/user/user_session')

/**
 * 权限验证middle ware
 */
const authrize = () => {
  return async (ctx, next) => {
    const reqUrl = ctx.request.originalUrl
    const method = ctx.request.method
    const reg = new RegExp(`(?:/api/v1)([/a-zA-Z0-9_-]+)`)
    let url = reqUrl.match(reg)
    if (url && url.length >= 2) {
      url = url[1]
    } else {
      return await next()
    }

    let permi = null // 当前url需要的权限
    for (let permis of permissions) {
      if (permis.path === url && permis.method.includes(method.toLowerCase())) {
        permi = permis
        break
      } else if (permis.path.includes('*')) {
        let path = permis.path.split('*')[0]
        if (url.startWith(path) && permis.method.includes(method.toLowerCase())) {
          permi = permis
          break
        }
      }
    }
    if (!permi) {
      return await next()
    }
    // logger.info('x-user-token: %s', ctx.request.header['x-user-token'])
    if (ctx.request.header['x-user-token']) {
      // TODO user-session
      // const userid = userSessionService.verify(ctx.request.header['x-user-token'])
      const userid = 1
      if (userid) {
        ctx.userId = userid
        logger.debug(`user {id: %s} permissions format {%s}`, userid, ctx.request.header['x-user-token'])
        return await next()
      } else {
        logger.debug(`permission denied {%s}`, ctx.request.header['x-user-token'])
      }
    }
    ctx.response.status = 200
    ctx.response.type = 'application/json'
    ctx.response.body = JSON.stringify({
      errcode: 4003,
      errmsg: 'Permission Denied'
    })
  }
}

module.exports = authrize()
