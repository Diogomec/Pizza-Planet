const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/profile", (req, res, next) => {
  res.render("admin/profile", { userInSession: req.session.currentUser});
});

router.get("/create-a-pizza", (req, res, next) => {
    res.render("admin/create-a-pizza", { userInSession: req.session.currentUser});
  });

  router.post("/create-a-pizza", (req, res, next) => {
    res.render("admin/create-a-pizza", { userInSession: req.session.currentUser});
  });

module.exports = router;
