const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza.model');

/* GET home page */
router.get('/', (req, res) => {
    res.render('index', {userInSession: req.session.currentUser} )
});

router.get('/menu', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.render('menu', { pizzas});
    } catch (error) {
    console.error('Error fetching pizzas:', error);
    res.render('error');
  }
});

module.exports = router;