const mongoose = require("mongoose");

const marqueSchema = mongoose.Schema({
  brand: {
    type: String,
    required: true
  },
  models: {
    type: [String],
    required: true
  }
});

const Marque = mongoose.model("Marque", marqueSchema);

module.exports = { Marque };
