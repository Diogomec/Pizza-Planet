const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');
const User = require('../models/User.model');

// Import the Mailgun client and setup code
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY || '176fd383e98ce1f50867dc96f76c8844-6d8d428c-2d995a83' });

router.get("/signup", isLoggedOut, (req, res, next) => {
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
                passwordHash: hashedPassword,
                email,
            });
        })
        .then(userFromDB => {
            mg.messages.create('sandboxc1883ad666f2480e867312386d247e45.mailgun.org', {
                from: "Excited User <mailgun@sandboxc1883ad666f2480e867312386d247e45.mailgun.org>",
                to: [userFromDB.email],
                subject: "Welcome to Pizza Planet",
                text: "Thank you for signing up to Pizza Planet! Use this Promo Code in your first order #PP2023 and gain 10% of discount",
                html: "<p>Thank you for signing up to Pizza Planet! Use this Promo Code in your first order #PP2023 and gain 10% of discount</p>"
            })
            .then(() => {
                res.redirect('/users/profile');
            })
            .catch((error) => {
                console.error(error);
                res.redirect("/error");
            });
        })
        .catch(error => next(error));
});

router.get("/login", isLoggedOut, (req, res, next) => {
    res.render("auth/login");
  });

router.post('/login', (req, res, next) => {

    const { email, password } = req.body;
    // console.log('SESSION =====> ', req.session);
   
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

router.post("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;
