require('dotenv').config()
const express     = require('express')
const stripe      = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser  = require('body-parser')
const morgan      = require('morgan')
const exphbs      = require('express-handlebars')
const PORT        = process.env.PORT || 3000

const app = express()

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))

// Set static folder
app.use(express.static(`${__dirname}/public`))

// Routes
app.get('/', (req, res) => {
  res.render('index')
})



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))