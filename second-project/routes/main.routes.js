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
    const userInSession = req.session.currentUser;
    const data = {pizzas, userInSession};
    console.log(pizzas.imageUrl)
    res.render('menu', { data });
    } catch (error) {
    console.error('Error fetching pizzas:', error);
    res.render('error');
  }
});

router.get('/menu/:pizzaId', async (req, res) => {
  try {
 const { pizzaId } = req.params;
 const pizza = await Pizza.findById(pizzaId)
 const userInSession = req.session.currentUser;
 const data = {pizza, userInSession};
 console.log(pizza, userInSession)
 
 res.render('details', { data })
} catch (error) {
  console.error('Error fetching pizza:', error);
  res.render('error');
}
});


module.exports = router;