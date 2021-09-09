const functions = require("firebase-functions");

const express = require("express")

const cors = require("cors");
const { request, response } = require("express");

const stripe = require("stripe")('sk_test_51JXbR3SITVU9pKUDe9SXyVkEBA9FnMCGAr5lPkDmjs83HiRenNmKwoFNChSTOg4eGUo95BD4Fe8fMZOyyKVSJe2D000hj7Koyu')

//API


//App config
const app = express()


//middleware
app.use(cors({ origin: true }))
app.use(express.json())



//API route
app.get('/', (request, response) => response.status(200).send('hello world'))

app.post('/payments/create', async(request, response) => {
    const total = request.query.total;
    console.log("payment request recieved ", total)

    const paymentIntent = await stripe.paymentIntent.create({
        amount: total,
        currency: "USD"
    })

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

//Listen command

exports.api = functions.https.onRequest(app)