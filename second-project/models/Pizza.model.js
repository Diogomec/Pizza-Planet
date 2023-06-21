const { Schema, model } = require("mongoose");

const pizzaSchema = new Schema(
  {
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
      default: "medium"
    },
    price: Number,
  },
  {   
    timestamps: true
  }
);

const Pizza = model("Pizza", pizzaSchema);

module.exports = Pizza;
