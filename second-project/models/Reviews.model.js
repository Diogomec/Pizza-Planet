const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
    date: {
      type: Date,
      default: Date.now
    },
    comment: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;