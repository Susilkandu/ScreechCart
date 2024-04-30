const log = require("../../tools/log");
try {
  const mongoose = require("mongoose");

  const itemSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    model: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
    qty: {
      type: Number,
    },
    photo: [
      {
        type: String,
      },
    ],
  });

  const Item = mongoose.model("Item", itemSchema);

  module.exports = {
    Item,
  };
} catch (error) {
  log(error);
}
