const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.YOUR_SECRET_KEY);
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("users/profile",  { userInSession: req.session.currentUser});
});

router.get("/my-orders", isLoggedIn, (req, res, next) => {
  const orderData = req.query.orderData;
  res.render("users/my-orders", { orderData: orderData, userInSession: req.session.currentUser });
});

router.get("/my-favourites", isLoggedIn, (req, res, next) => {
  res.render("users/my-favourites",  { userInSession: req.session.currentUser});
});

router.get("/create-my-pizza", isLoggedIn, (req, res, next) => {
  res.render("users/create-my-pizza",  { userInSession: req.session.currentUser});
});


router.post('/create-payment-intent', async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true
    });

    // Return the client secret
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred during payment processing.' });
  }
});



module.exports = router;
