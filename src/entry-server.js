// 仅运行于服务器
import {createApp} from './main'

export default context => {
  return new Promise((resolve, reject) => {

    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个Promise,
    // 以便服务器能够等待所有的内容在渲染前，就已经准备就绪
    const {app, router} = createApp()
    // 设置服务器端router的位置
    router.push(context.url)

    // 等待router将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({code: 404})
      }
      // Promise 应该resolve应用程序实例，以便它可以渲染
      resolve(app)
    }, reject)
  })
}
