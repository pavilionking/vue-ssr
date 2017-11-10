const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const koaStatic = require('koa-static')
const path = require('path')
const fs = require('fs')
const logger = require('./log4js')('app')
const config = require('./configs/config')

const resolve = file => path.resolve(__dirname, file)

const app = new Koa()

// 路由
const addMapping = (router, mapping) => {
  for (let url in mapping) {
    let [method, path] = url.split(' ')
    if (method.toUpperCase() === 'GET') {
      if (path.includes('/api')) {
        path = `/api/${config.apiVersion}${path.split('/api')[1]}`
      }
      router.get(path, mapping[url])
      logger.info(`register URL mapping: GET ${path}`)
    } else if (method.toUpperCase() === 'POST') {
      if (path.includes('/api')) {
        path = `/api/${config.apiVersion}${path.split('/api')[1]}`
      }
      router.post(path, mapping[url])
      logger.info(`register URL mapping: POST ${path}`)
    // } else if (path === '/upload') {
    //   const upload = multer({dest: 'public/upload/'})
    //   router.post(path, upload.array("file"), mapping[url])
    } else {
      logger.info(`invilid url ${url}`)
    }
  }
}

// 控制器
const addController = (router, url) => {
  let files = fs.readdirSync(path.join(__dirname, url))
  let jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  })
  for (let f of jsFiles) {
    console.log('process controller: ' + f)
    let mapping = require(path.resolve(__dirname, url, f))
    addMapping(router, mapping)
  }
  for (let f of files) {
    if (fs.statSync(path.resolve(__dirname, url, f)).isDirectory()) {
      addController(router, path.resolve(url, f))
    }
  }
}

// 中间键
const addMiddleware = url => {
  let files = fs.readdirSync(path.join(__dirname, url))
  let jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  })
  for (let f of jsFiles) {
    console.log('process middlewares: ' + f)
    const middle = require(path.resolve(__dirname, url, f))
    app.use(middle)
  }
}

app.use(bodyParser())
// 静态资源目录对于相对入口文件index.js的路径
app.use(koaStatic(resolve('../dist'), {
  // maxage: 30 * 24 * 60 * 60 * 1000
}
))
addMiddleware('./middlewares')
addController(router, './controllers')

app.use(router.routes())

module.exports = app
