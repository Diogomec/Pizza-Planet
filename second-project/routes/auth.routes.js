const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', (req, res, next) => {

    const { username, email, password } = req.body;
 
  bcryptjs
    .genSalt(saltRounds)
    .then(salt => bcryptjs.hash(password, salt))
    .then(hashedPassword => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword
      });
    })
    .then(userFromDB => {
        res.redirect('/users/profile');
    })
    .catch(error => next(error));
});

router.get("/login", (req, res, next) => {
    res.render("auth/login");
  });

module.exports = router;
