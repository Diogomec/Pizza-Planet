const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require('../models/User.model');
const Pizza = require('../models/Pizza.model');

/* GET Create-A-Pizza page */
router.get("/create-a-pizza", isLoggedIn, (req, res, next) => {
    res.render("admin/create-a-pizza", { userInSession: req.session.currentUser});
});

/* POST Create-A-Pizza page */
router.post("/create-a-pizza", async (req, res, next) => {
    const { name, size, sauce, ingredients, price } = req.body
    // console.log(req.body)
    const pizza = await Pizza.create({name, size, sauce, ingredients, price})
    res.redirect('/admin/menu')
});

/* GET Create-A-User page */
router.get("/create-a-user", isLoggedIn, (req, res, next) => {
    res.render("admin/create-a-user", {userInSession: req.session.currentUser});
});

/* POST Create-A-User page */
router.post("/create-a-user", async (req, res, next) => {
    const { username, email, password, role } = req.body;
 
    bcryptjs
      .genSalt(saltRounds)
      .then(salt => bcryptjs.hash(password, salt))
      .then(hashedPassword => {
        return User.create({
          username,
          passwordHash: hashedPassword,
          email,
          role
        });
      })
      .then(() => {
          res.redirect('/admin/create-a-user', {userInSession: req.session.currentUser});
      })
      .catch(error => next(error));
  });

/* GET Menu page */
router.get("/menu", isLoggedIn, async (req, res, next) => {
  try {
    const pizzas = await Pizza.find();
    const userInSession = req.session.currentUser;
    const data = {pizzas, userInSession};
    // console.log(data)
    res.render("admin/menu", { data });
  } catch (error) {
      console.error('Error fetching pizzas:', error);
      res.render('error');
  }
});

/* GET Details page */
router.get('/menu/:pizzaId', isLoggedIn, async (req, res) => {
  try {
    
 const { pizzaId } = req.params;
 const pizza = await Pizza.findById(pizzaId)
 const userInSession = req.session.currentUser;
 console.log(pizza)
 const data = {pizza, userInSession};
 res.render('admin/details', { data })
} catch (error) {
  console.error('Error fetching pizza:', error);
  res.render('error');
}
});

router.get('/menu/:pizzaId/edit-a-pizza', isLoggedIn, async (req, res, next) => {
  try {

  const { pizzaId } = req.params;

  const pizza = await Pizza.findById(pizzaId)

      // console.log(bookToEdit);

      res.render('admin/edit-a-pizza', { pizza });
  } catch (error) {
      console.error('Error fetching pizza:', error);
      res.render('error');
    }
});

router.post('/menu/:pizzaId/edit-a-pizza', (req, res, next) => {

  const { pizzaId } = req.params;
 
  const { name, sauce, ingredients, size, price } = req.body;
 
  Pizza.findByIdAndUpdate(pizzaId, { name, sauce, ingredients, size, price }, { new: true })
    .then(updatedPizza => res.redirect(`/admin/menu`)) // go to the details page to see the updates
    .catch(error => next(error));
});

router.post('/menu/:pizzaId/delete-a-pizza', (req, res, next) => {
  const { pizzaId } = req.params;
 
  Pizza.findByIdAndDelete(pizzaId)
    .then(() => res.redirect('/admin/menu'))
    .catch(error => next(error));
});

module.exports = router;
