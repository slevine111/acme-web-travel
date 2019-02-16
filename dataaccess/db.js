const { Hotel, Stay, User } = require('./models/index')
const connection = require('./connection')

class DB {
  constructor() {
    this.connection = connection
  }

  static dbInit() {
    return connection
      .authenticate()
      .then(() => {
        console.log('successfully connected')
        Hotel.hasMany(Stay)
        Stay.belongsTo(Hotel)
        User.hasMany(Stay)
        Stay.belongsTo(User)
      })
      .then(() => {
        return connection.sync({ force: true })
      })
      .catch(err => {
        console.log('unable to connect to database')
        throw err
      })
  }

  static seedDatabase() {
    return this.dbInit()
      .then(() => {
        const users = Promise.all([
          User.create({ name: 'Larry' }),
          User.create({ name: 'Moe' }),
          User.create({ name: 'Curly' })
        ])

        const hotels = Promise.all([
          Hotel.create({ name: 'Hilton' }),
          Hotel.create({ name: 'Sheraton' })
        ])

        const stays = Promise.all([
          Stay.create({ days: 3 }),
          Stay.create({ days: 4 }),
          Stay.create({ days: 5 }),
          Stay.create({ days: 19 }),
          Stay.create({ days: 4 }),
          Stay.create({ days: 5 })
        ])

        return Promise.all([users, hotels, stays])
      })
      .then(([users, hotels, stays]) => {
        const [larry, moe, curly] = users
        const [hilton, sheraton] = hotels
        const [stay1, stay2, stay3, stay4, stay5, stay6] = stays

        return Promise.all([
          moe.setStays([stay1, stay2, stay3]),
          larry.setStays(stay4),
          curly.setStays([stay5, stay6]),
          hilton.setStays([stay3, stay6]),
          sheraton.setStays([stay1, stay2, stay4, stay5])
        ])
      })
  }

  getAllSiteContent() {
    return User.findAll({ include: [{ model: Stay, include: Hotel }] }).then(
      users => {
        return users.reduce((acc, user) => {
          acc[user.get().name] = user.stays.map(stay => {
            return {
              days: stay.get().days,
              hotel: stay.hotel.get().name
            }
          })
          return acc
        }, {})
      }
    )
  }
}

module.exports = DB
