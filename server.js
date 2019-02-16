const app = require('./app')
const DB = require('./dataaccess/db')

const PORT = process.env.PORT || 3000

DB.seedDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
  })
  .catch(err => {
    console.error(err)
  })
