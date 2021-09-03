// domain/.netlify/functions/create-payment-intent
// we are in Node js land on this page. ** require ** is just like es6 import
// .env file is in root we don't have to input file path in config function
require('dotenv').config()

const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
    if (event.body) {
        const { cart, shipping_fee, total_amount } = JSON.parse(event.body)

        const calculateOrderAmount = () => {
            return shipping_fee + total_amount
        }

        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: calculateOrderAmount(),
                currency: 'usd'
            })
            // Below is getting sent back to StripeCheckout component
            return {
                statusCode: 200,
                body: JSON.stringify({ clientSecret: paymentIntent.client_secret })
            }
        } catch (error) {
            return {
                statusCode: 500,
                body: JSON.stringify({ msg: error.message }),
            }
        }
    }
    return {
        statusCode: 200,
        body: 'Create Payment Intent',
    }
}