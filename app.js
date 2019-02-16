const app = require('express')()
const morgan = require('morgan')
const DB = require('./dataaccess/db')

const db = new DB()

app.use(morgan('dev'))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res, next) => {
  db.getAllSiteContent()
    .then(data => {
      res.render('index', { data })
    })
    .catch(next)
})

module.exports = app
