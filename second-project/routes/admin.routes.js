const express = require('express');
const router = express.Router();
const Pizza = require('../models/Pizza.model');

/* GET home page */
router.get("/profile", (req, res, next) => {
  res.render("admin/profile", { userInSession: req.session.currentUser});
});

router.get("/create-a-pizza", (req, res, next) => {
    res.render("admin/create-a-pizza");
  });

  router.post("/create-a-pizza", (req, res, next) => {

    const { name, size, sauce, ingredients, price } = req.body
    console.log(req.body)

    Pizza.create({name, size, sauce, ingredients, price})
    .then(pizza => console.log(pizza))
  });

module.exports = router;
