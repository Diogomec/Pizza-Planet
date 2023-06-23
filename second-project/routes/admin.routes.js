const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require('../models/User.model');
const Pizza = require('../models/Pizza.model');

/* GET home page */
router.get("/profile", (req, res, next) => {
  res.render("admin/profile", { userInSession: req.session.currentUser});
});

router.get("/create-a-pizza", (req, res, next) => {
    res.render("admin/create-a-pizza", { userInSession: req.session.currentUser});
});

router.post("/create-a-pizza", (req, res, next) => {

    const { name, size, sauce, ingredients, price } = req.body
    console.log(req.body)

    Pizza.create({name, size, sauce, ingredients, price})
    .then(pizza => console.log(pizza))
});

router.get("/create-a-user", async (req, res, next) => {
    res.render("admin/create-a-user", {userInSession: req.session.currentUser});
});

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
      .then(userFromDB => {
          res.redirect('/admin/create-a-user', {userInSession: req.session.currentUser});
      })
      .catch(error => next(error));
  });

router.get("/menu", async (req, res, next) => {
    const pizzas = await Pizza.find();
    const userInSession = await req.session.currentUser;
    res.render("admin/menu", { pizzas, userInSession});
});

module.exports = router;
