const mongoose = require('mongoose');
const User = require('../models/User.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/second-project";

const admins = [
    {
      username: 'Bernard',
      email: 'bernard@pizzaplanet.com',
      passwordHash: 'admin123',
      role: 'Admin'
    },
    {
      username: 'Diogo',
      email: 'diogo@pizzaplanet.com',
      passwordHash: 'admin123',
      role: 'Admin'
    }
  ];

  mongoose.connect("mongodb://127.0.0.1:27017/second-project")
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))

   User.insertMany(admins)
    .then(createdAdmins => {
      console.log(createdAdmins)
        mongoose.connection.close()
    })
    .catch(err => console.log(err))