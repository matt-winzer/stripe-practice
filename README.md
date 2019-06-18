# Stripe Practice

A server-side rendered node/express/handlebars application to practice using the Stripe API for handling payments.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Nodejs
* NPM/Yarn
* Stripe Account
* Ngrok (optional)

### Installation
1. Fork/clone this repository
2. Install project dependencies
```
$ npm install
```

### Stripe Configuration
1. Retrieve public key and secret key from stripe account [dashboard](https://dashboard.stripe.com/test/apikeys)
2. Add public key to top line of `public/scripts/purchase.js`
```js
const stripe = Stripe('pk_test_yourPublicKey')
```
3. Create .env file in project root
4. Add secret key to .env file, ex:
```
STRIPE_SECRET_KEY=sk_test_yourSecretKey
```
5. Create a webhook from stripe account [dashboard](https://dashboard.stripe.com/test/webhooks)
```
Endpoint: /webhooks/checkout
Event Type: checkout.session.completed
```
6. Add webhook signing secret to .env, ex:
```
STRIPE_ENDPOINT_SECRET=whsec_yourSecretHere
```
7. In test mode, you will need to use a tool like [ngrok](https://www.npmjs.com/package/ngrok) to simulate a live https connection for the webhook to work. The application will still work without the webhook, but the redirect on successful payment will take longer.

## Starting Application
1. Run application: `$ npm start` OR `$ npm run dev`
2. Navigate to http://localhost:3000/ in browser
3. Click the `purchase` button to initiate a purchase using stripe
4. Test credit card number: 4242 4242 4242 4242