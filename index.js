const stripe = Stripe('pk_test_QSxJFjYgQXTkPvIyB4Q01xxg00qZ37aRqD')
const purchaseButton = document.querySelector('#purchase')
purchaseButton.addEventListener('click', async (e) => {
  e.preventDefault()
  console.log('clicked')
  try {
    // Initiate checkout session to get session id
    const response = await fetch('http://localhost:3000/checkout', {
      method: 'POST'
        headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    const sessionId = data.session.id
    // Redirect to checkout
    const result = await stripe.redirectToCheckout({ sessionId })
    console.log('STRIPE CHECKOUT RESULT', result)
  } catch (error) {
    console.log('STRIPE ERROR', error)
  }
})