const LOCAUX = [
  {
    id: "1",
    titre: "aaa",
    adresse: "aaaaaaaaaaaaaaaaaaaaaa",
    latitude: 36.848788,
    longitude: 10.263999,
  },
  {
    id: "2",
    titre: "bbb",
    adresse: "bbbbbbbbbbbbbbbbbbbbbbbb",
    latitude: 35.8293,
    longitude: 10.64063,
  },
  {
    id: "3",
    titre: "ccc",
    adresse: "ccccccccccccccccc",
    latitude: 36.72589,
    longitude: 9.18734,
  },
];

const AMOUNT_OF_CARS_PER_LOAD = 3;

const PRIX = { MIN: 10, MAX: 999 };

const ANNEE = { MIN: 1980, MAX: 2020 };

const KMS = { MIN: 0, MAX: 500 };

const COMPANY_NAME = "KAMMOUN AUTO";

const ENERGIE = [
  { key: "essence", text: "Essence", value: "essence" },
  { key: "diesel", text: "Diesel", value: "diesel" },
  { key: "electrique", text: "Eléctrique", value: "electrique" },
  { key: "bioEthanol", text: "BioEthanol", value: "bioEthanol" },
  { key: "hybrideE", text: "Hybride(essence/électricité)", value: "hybrideE" },
  { key: "hybrideD", text: "Hybride(diesel/électricité)", value: "hybrideD" },
  { key: "gpl", text: "GPL", value: "gpl" },
  { key: "gnv", text: "GNV", value: "gnv" },
  { key: "hydrogene", text: "Hydrogène", value: "hydrogene" },
];

const CARROSSERIE = [
  { key: "citadine", text: "Citadine", value: "citadine" },
  { key: "SUV", text: "SUV / 4x4 / Pick-Up", value: "SUV" },
  { key: "coupe", text: "Coupé", value: "coupe" },
  { key: "monospace", text: "Monospace", value: "monospace" },
  { key: "berline", text: "Berline", value: "berline" },
  { key: "compacte", text: "Compacte", value: "compacte" },
  { key: "utilitaire", text: "Utilitaire", value: "utilitaire" },
  { key: "break", text: "Break", value: "break" },
];

export {
  LOCAUX,
  ANNEE,
  KMS,
  PRIX,
  COMPANY_NAME,
  ENERGIE,
  CARROSSERIE,
  AMOUNT_OF_CARS_PER_LOAD,
};
