const express = require('express');
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require('../models/User.model');
const bcryptjs = require('bcryptjs');
const saltRounds = 10;

router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', (req, res, next) => {

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
        res.redirect('/users/profile');
    })
    .catch(error => next(error));
});

router.get("/login", isLoggedOut, (req, res, next) => {
    res.render("auth/login");
  });

router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    console.log('SESSION =====> ', req.session);
   
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
   
    User.findOne({ email })
    .then(user => {
      console.log(user)
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
          if(user.role === 'User'){
            req.session.currentUser = user;
            res.redirect('/users/profile');
        } else {
          req.session.currentUser = user;
          res.redirect('/admin/profile');
        }
    
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

  router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
  });

module.exports = router;
