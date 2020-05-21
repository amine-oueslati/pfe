const mongoose = require("mongoose");

const annonceSchema = mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    marque: {
      type: String,
      required: true,
    },
    modele: {
      type: String,
      required: true,
    },
    prix: {
      type: Number,
      required: true,
    },
    annee: {
      type: Number,
      required: true,
      min: 1990,
      max: 2020,
    },
    puissance: {
      type: Number,
      required: true,
      min: 3,
    },
    kms: {
      type: Number,
      required: true,
      min: 0,
    },
    boite: {
      type: String,
      required: true,
    },
    carrosserie: {
      type: String,
      required: true,
    },
    energie: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Annonce = mongoose.model("Annonce", annonceSchema);

module.exports = { Annonce };
