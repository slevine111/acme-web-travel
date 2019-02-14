const connection = require('../connection')

const Hotel = connection.define('hotel', {
  name: connection.Sequelize.TEXT
})

module.exports = Hotel
