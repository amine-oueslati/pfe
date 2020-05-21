const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  prenom: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    required: true,
  },
  idAnnonce:{
    type: String
  }
});

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message };
