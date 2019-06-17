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

app.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        name: 'T-shirt',
        description: 'Comfortable cotton t-shirt',
        images: ['http://lorempixel.com/400/200/sports/'],
        amount: 500,
        currency: 'usd',
        quantity: 1,
      }, {
        name: 'T-shirt',
        description: 'Another great cotton t-shirt',
        images: ['http://lorempixel.com/400/200/food/'],
        amount: 1000,
        currency: 'usd',
        quantity: 1,
      }],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    })
    res.json({
      session
    })
  }
  catch (error) {
    console.log('STRIPE SESSION ERROR', error)
    res.status(400).json({
      error: error
    })
  }
})

app.get('/success', (req, res) => {
  res.render('success')
})

app.get('/cancel', (req, res) => {
  res.render('cancel')
})



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))