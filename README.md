# Stripe Practice

A server-side rendered node/express/handlebars application to practice using the Stripe API for handling payments.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* Nodejs
* NPM/Yarn
* Stripe Account
* Ngrok (optional)

### Installing
1. Fork/clone this repository
2. Install project dependencies
```$ npm install```

### Configuring Stripe
1. Retrieve secret key from stripe account [dashboard](https://dashboard.stripe.com/test/apikeys)
2. Create .env file in project root
3. Add secret key to .env file, ex:
```
STRIPE_SECRET_KEY=sk_test_asdasdasdasd
```
4. Create a webhook from stripe account [dashboard](https://dashboard.stripe.com/test/webhooks)
  * Endpoint: /webhooks/checkout
  * Event Type: checkout.session.completed
5. In test mode, you will need to use a tool like [ngrok](https://www.npmjs.com/package/ngrok) to simulate a live https connection for the webhook to work. However, the application will still work without the webhook.

## Running
1. Run application
```$ npm start```
OR
```$ npm run dev```
2. Navigate to http://localhost:3000/ in browser
3. Click the `purchase` button to initiate a purchase using stripe
