const { Schema, model } = require("mongoose");

const pizzaSchema = new Schema(
  {
    imageUrl: {
      type: String,
      default: "images/pizzas/cheesy-bites.jpg"
    },
    name: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    sauce: String,
    ingredients: [String],
    sizes: [
      {
        name: String,
        price: Number
      }
    ],
    price: Number,
  },
  {   
    timestamps: true
  }
);

const Pizza = model("Pizza", pizzaSchema);

module.exports = Pizza;
