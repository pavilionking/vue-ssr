class IndexController {
  async index (ctx) {
    ctx.json()
  }
}

const index = new IndexController()
module.exports = {
  'GET /api/index': index.index
}
