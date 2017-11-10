const app = require('./app')
const model = require('./model')
const logger = require('./log4js')('startup')

model.sync()

let port = process.env.port || 3000
let server = app.listen(port, () => {
  logger.info('start listen at port %s with pid ', server.address().port, process.pid)
})
