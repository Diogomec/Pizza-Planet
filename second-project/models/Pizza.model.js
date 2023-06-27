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
    size: {
      type: String,
      enum: ["Asteroid - (Small)", "Sun - (Medium)", "Galaxy - (Large)"],
      default: "Sun - (Medium)"
    },
    price: Number,
  },
  {   
    timestamps: true
  }
);

const Pizza = model("Pizza", pizzaSchema);

module.exports = Pizza;
