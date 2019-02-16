const Sequelize = require('sequelize')

const connection = new Sequelize(process.env.DATABASE_URL, {
  logging: false,
  define: {
    freezeTableName: true
  }
})

module.exports = connection
