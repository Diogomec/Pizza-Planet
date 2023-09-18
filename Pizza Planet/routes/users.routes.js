const express = require('express');
const router = express.Router();
const { isLoggedIn} = require('../middleware/route-guard.js');

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


module.exports = router;
