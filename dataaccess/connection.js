const Sequelize = require('sequelize')

const connection = new Sequelize(process.env.DATABASE_URL, {
  define: {
    freezeTableName: true
  }
})

module.exports = connection
