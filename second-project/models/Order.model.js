const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    drinks: {
      type: String,
      required: false
    },
    price: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;