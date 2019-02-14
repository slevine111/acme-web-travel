const connection = require('../connection')

const User = connection.define('user', {
  name: connection.Sequelize.TEXT
})

module.exports = User
