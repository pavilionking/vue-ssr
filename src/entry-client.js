// 仅运行于客户端
import {createApp} from './main'

const {app, router} = createApp()
router.onReady(() => {
  // 因为有可能存在异步组件，所示等待router将所有异步组件加载完毕，服务器端也要此操作
  app.$mount('#app')
})
