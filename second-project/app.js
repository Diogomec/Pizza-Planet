// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

require('./config/session.config')(app);

// Register the partials directory
const path = require('path');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "Pizza Planet";

app.locals.appTitle = projectName;

// Importing the Models
const User = require('./models/User.model');
const Pizza = require('./models/Pizza.model');


// All pizzas
const seedAllPizzas = require("./seeds/pizza.seed");
seedAllPizzas();

// 👇 Start handling routes here
const mainRoutes = require("./routes/main.routes");
app.use("/", mainRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const usersRoutes = require("./routes/users.routes");
app.use("/users", usersRoutes);

const adminRoutes = require("./routes/admin.routes");
app.use("/admin", adminRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
