const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require('../models/User.model');
const Pizza = require('../models/Pizza.model');

/* GET Create-A-Pizza page */
router.get("/create-a-pizza", isLoggedIn, (req, res) => {
    res.render("admin/create-a-pizza", { userInSession: req.session.currentUser});
});

/* POST Create-A-Pizza page */
router.post("/create-a-pizza", isLoggedIn, async (req, res) => {
    const { name, size, sauce, ingredients, price } = req.body
    const pizza = await Pizza.create({name, size, sauce, ingredients, price})
    res.redirect('/admin/menu', { pizza })
});

/* GET Create-A-User page */
router.get("/create-a-user", isLoggedIn, (req, res) => {
    res.render("admin/create-a-user", {userInSession: req.session.currentUser});
});

/* POST Create-A-User page */
router.post("/create-a-user", isLoggedIn, async (req, res, next) => {
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
      res.render('admin/edit-a-pizza', { pizza });
  } catch (error) {
      console.error('Error fetching pizza:', error);
      res.render('error');
    }
});

router.post('/menu/:pizzaId/edit-a-pizza', isLoggedIn, async (req, res) => {
  try {
  const { pizzaId } = req.params;
  const { name, sauce, ingredients, size, price } = req.body;
  const pizza = await Pizza.findByIdAndUpdate(pizzaId, { name, sauce, ingredients, size, price }, { new: true })
    res.redirect(`/admin/menu`, { pizza }) 
  } catch (error) {
    console.error('Error editing pizza:', error);
    res.render('error');
   }
});

router.post('/menu/:pizzaId/delete-a-pizza', isLoggedIn, async (req, res) => {
  try {
  const { pizzaId } = req.params;
  const pizza = await Pizza.findByIdAndDelete(pizzaId)
    res.redirect('/admin/menu')
  } catch (error) {
    console.error('Error deleting pizza:', error);
    res.render('error');
   }
});

module.exports = router;
