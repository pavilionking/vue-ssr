const Sequelize = require('sequelize')
const config = require('./configs/config')
const uuid = require('uuid')
const logger = require('./log4js')('db')

logger.debug('init sequelize...')

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host || 'localhost',
  dialect: config.dialect || 'mysql',
  timezone: '+08:00',
  pool: {
    max: 5,
    min: 0,
    idle: 100000
  }

  // logging: false
})

const ID_TYPE = Sequelize.STRING(32)

const defineModel = (name, attributes) => {
  let attrs = {}
  for (let key in attributes) {
    let value = attributes[key]
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false
      attrs[key] = value
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      }
    }
  }
  attrs.id = {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  }
  attrs.create_date = {
    type: Sequelize.DATE
  }
  attrs.create_by = {
    type: Sequelize.INTEGER(11),
    allowNull: true
  }
  attrs.update_date = {
    type: Sequelize.DATE,
    allowNull: true
  }
  attrs.update_by = {
    type: Sequelize.INTEGER(11),
    allowNull: true
  }
  return sequelize.define(name, attrs, {
    tableName: `${name}`,
    timestamps: true,
    createdAt: 'create_date',
    updatedAt: 'update_date'
  })
}

const sync = () => {
  sequelize.sync({force: false})
}

module.exports = {
  model: defineModel,
  sync,
  sequelize
}
