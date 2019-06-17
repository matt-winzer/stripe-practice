require('dotenv').config()
const express         = require('express')
const stripe          = require('stripe')(process.env.STRIPE_SECRET_KEY)
const bodyParser      = require('body-parser')
const morgan          = require('morgan')
const exphbs          = require('express-handlebars')
const PORT            = process.env.PORT || 3000
const endpointSecret  = process.env.STRIPE_ENDPOINT_SECRET

const app = express()

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Middleware
app.use('/webhooks/checkout', bodyParser.raw({ type: 'application/json' })) // Use raw body parsing for stripe webhooks
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

app.post('/webhooks/checkout', (request, response) => {
  const sig = request.headers['stripe-signature']
  let event

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`)
  }

  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Fulfill the purchase...
    console.log('checkout session data', session)
  }

  // Return a response to acknowledge receipt of the event
  response.json({ received: true })
})



app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))