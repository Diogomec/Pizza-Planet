const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require('../models/User.model');


router.get("/signup", isLoggedOut, (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', isLoggedOut, (req, res, next) => {
    const { username, email, password } = req.body;

    bcryptjs
        .genSalt(saltRounds)
        .then(salt => bcryptjs.hash(password, salt))
        .then(hashedPassword => {
            return User.create({
                username,
                passwordHash: hashedPassword,
                email,
            });
        })
        .then(userFromDB => {
                res.redirect('/users/profile');
            })
            .catch((error) => {
                console.error(error);
                res.redirect("/error");
        })
        .catch(error => next(error));
});

router.get("/login", isLoggedOut, (req, res, next) => {
    res.render("auth/login");
  });

router.post('/login', isLoggedOut, (req, res, next) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
      res.render('auth/login', {
        errorMessage: 'Please enter both, email and password to login.'
      });
      return;
    }
    User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
          if(user.role === 'User'){
            req.session.currentUser = user;
            console.log(user)
            res.redirect('/users/profile');
        } else {
          req.session.currentUser = user;
          res.redirect('/admin/menu');
        }
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});

router.post("/logout", isLoggedIn, (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
