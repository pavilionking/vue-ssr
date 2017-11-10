module.exports =  {
  apiVersion: 'v1',

  // 数据库
  dialect: 'mysql',
  database: 'database',
  username: 'root',
  password: '',
  host: 'localhost',
  port: 3306,

  defaultPageSize: 10, // 默认每页大小

  jwtExpires: 3600 * 24 * 30, // 登录过期时间
  jwtSecret: '5e890586eddf4b69a2fa8a2b3e49d3c8',
  jwtAudience: 'IFRIDGE',
  jwtAuthObj: 'ThirdSession',
  jwtAlgorithm: 'HS512',

  // 短信测试
  // smsUser: 'wljclub',
  // smsKey: 'ec831a6d19934498f90e44f516864e78',

  // 小程序app
  appid: 'wx693f0c0936f3127c',
  appSecret: '824d74ecaf729b8608e1e95d7458ba8e',

  payNotifyUrl: 'https://dev.papagostore.com/ifridge/saleorder/settle'
}
