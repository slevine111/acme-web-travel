const connection = require('../connection')

const Stay = connection.define('stay', {
  days: connection.Sequelize.INTEGER
})

module.exports = Stay
