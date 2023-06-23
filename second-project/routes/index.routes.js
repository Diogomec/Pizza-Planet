const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza.model');

/* GET home page */



router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.render('index', { pizzas, userInSession: req.session.currentUser });
    } catch (error) {
    console.error('Error fetching pizzas:', error);
    res.render('error');
  }
});

module.exports = router;